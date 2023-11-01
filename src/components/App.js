import React, {Component} from 'react';
import Will from '../truffle_abis/Will.json';
import Web3 from 'web3';

class App extends Component {

    async UNSAFE_componentWillMount(){
       await this.loadWeb3();
       await this.blockchainData();
    }

    //load web3
    async loadWeb3(){
        if(window.ethereum){
           window.web3 = new Web3(window.ethereum);
           await window.ethereum.enable();
        }else if(window.web3){
            window.web3 = new Web3(window.web3.currentProvider)
        }else{
            alert('No ethereum browser found! Checkout metamask');
        }
    }

    //load blockchain data
    async blockchainData(){
        const web3 = window.web3;
        const account = await web3.eth.getAccounts();
        this.setState({
            account : account[0]
        })
        const networkId = await web3.eth.net.getId();
        //console.log(networkId);


        const willData = Will.networks[networkId];
        if(willData){
            const account = await web3.eth.getAccounts();
        this.setState({
            account : account[0]
        })
             const will = await new web3.eth.Contract(Will.abi,willData.address);
             this.setState({will});
             let willBalance = await web3.eth.getBalance(willData.address);
             let willBal = await web3.utils.fromWei(willBalance,'Ether').toString();
             this.setState({balance: willBal})
             
        }else{
            alert('Will contract not deployed');
        }
        this.setState({loading : false})
    }

    setInheritance = (address,amount) =>{
        this.setState({loading : true})
        this.state.will.methods.setInheritance(address,amount).send({from : this.state.account}).on('transactionHash',(hash) =>{
            this.setState({loading : false})
        })
    }

    hasDeceased = () =>{
        this.setState({loading : true})
        this.state.will.methods.hasDeceased().send({from : this.state.account}).on('transactionHash',(hash) =>{
            this.setState({loading : false})
        })
    }

    constructor(props){
        super(props);

        this.state = {
            account : '',
            balance : '',
            will : {},
            loading : true
        }
    }

    render(){
        return(
            <div>
                <nav className='navbar navbar-dark fixed-top shadow p-0' style={{backgroundColor:'black',height:'50px'}}>
               <a className='navbar-brand col-sm-3 col-md-2 mr-0' style={{color:'white'}} href='#'>
               Will and Inheritance App</a>
            </nav>
            <div id="content" className="mt-5">
            <small style={{color:'black'}}>Account Number : {this.state.account}</small>
                <h4>Total Inheritance : {this.state.balance} Eth</h4>
                 <form onSubmit={(event) =>{
                event.preventDefault();
                let amount;
                amount = this.inputOne.value.toString();
                amount = window.web3.utils.toWei(amount,'Ether');
                let address = this.inputTwo.value.toString();
                this.setInheritance(address,amount);

             }} className='mb-3' style={{marginTop:'4em'}}>
               <div className="input-group mb-4">
               <label for='address'>Address : </label>&nbsp;
                <input type='text' placeholder='0x0' ref={(inputTwo) => this.inputTwo = inputTwo}/>
                <label for='amount'>Amount</label>
                <input type='text' placeholder='0' ref={(inputOne)=> this.inputOne = inputOne}/>
                <button type='submit' className='btn btn-primary btn-md'>send</button>
                <button type='submit' className='btn btn-primary btn-md'
                 onClick={(event) =>{
                    event.preventDefault();
                    this.hasDeceased();
                 }}
                >deceased</button>
               </div>
             </form>
            </div>
            
            </div>
        )
    }
}
export default App;