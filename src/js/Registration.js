var landcontract;

$('#submit').click(function(){
	var ethereum=window.ethereum;
	var web3=window.web3;
    if (typeof ethereum !=='undefined') {
 		ethereum.enable(); 
      	web3 = new Web3(ethereum);
     
      console.log("initWeb3")
    }
    else if(typeof web3 !=='undefined')
    {
    	web3=new Web3(web3.currentProvider);
    }
    else{
      web3Provider =new Web3.providers.HttpProvider('http://localhost:8545');
     
    }


    var address="0xFEe7a0327bb8F27fe81F9577368bC9c282F3fCdf";
    var abi=[{"inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor"}, {"constant": false, "inputs": [{"internalType": "string", "name": "_state", "type": "string"}, {"internalType": "string", "name": "_district", "type": "string"}, {"internalType": "string", "name": "_village", "type": "string"}, {"internalType": "uint256", "name": "_surveyNumber", "type": "uint256"}, {"internalType": "address payable", "name": "_OwnerAddress", "type": "address"}, {"internalType": "uint256", "name": "_marketValue", "type": "uint256"}, {"internalType": "uint256", "name": "id", "type": "uint256"} ], "name": "Registration", "outputs": [{"internalType": "bool", "name": "", "type": "bool"} ], "payable": false, "stateMutability": "nonpayable", "type": "function"}, {"constant": false, "inputs": [{"internalType": "address", "name": "_superAdmin", "type": "address"}, {"internalType": "string", "name": "_village", "type": "string"} ], "name": "addSuperAdmin", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function"}, {"constant": false, "inputs": [{"internalType": "uint256", "name": "property", "type": "uint256"} ], "name": "buyProperty", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function"}, {"constant": true, "inputs": [{"internalType": "string", "name": "_state", "type": "string"}, {"internalType": "string", "name": "_district", "type": "string"}, {"internalType": "string", "name": "_village", "type": "string"}, {"internalType": "uint256", "name": "_surveyNumber", "type": "uint256"} ], "name": "computeId", "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"} ], "payable": false, "stateMutability": "view", "type": "function"}, {"constant": true, "inputs": [{"internalType": "uint256", "name": "id", "type": "uint256"}, {"internalType": "address", "name": "user", "type": "address"} ], "name": "findId", "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"} ], "payable": false, "stateMutability": "view", "type": "function"}, {"constant": true, "inputs": [{"internalType": "uint256", "name": "id", "type": "uint256"} ], "name": "landInfoOwner", "outputs": [{"internalType": "string", "name": "", "type": "string"}, {"internalType": "string", "name": "", "type": "string"}, {"internalType": "string", "name": "", "type": "string"}, {"internalType": "uint256", "name": "", "type": "uint256"}, {"internalType": "bool", "name": "", "type": "bool"}, {"internalType": "address", "name": "", "type": "address"}, {"internalType": "enum landRegistration.reqStatus", "name": "", "type": "uint8"} ], "payable": false, "stateMutability": "view", "type": "function"}, {"constant": true, "inputs": [{"internalType": "uint256", "name": "id", "type": "uint256"} ], "name": "landInfoUser", "outputs": [{"internalType": "address", "name": "", "type": "address"}, {"internalType": "uint256", "name": "", "type": "uint256"}, {"internalType": "bool", "name": "", "type": "bool"}, {"internalType": "address", "name": "", "type": "address"}, {"internalType": "enum landRegistration.reqStatus", "name": "", "type": "uint8"} ], "payable": false, "stateMutability": "view", "type": "function"}, {"constant": false, "inputs": [{"internalType": "uint256", "name": "property", "type": "uint256"} ], "name": "makeAvailable", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function"}, {"constant": false, "inputs": [{"internalType": "uint256", "name": "property", "type": "uint256"}, {"internalType": "enum landRegistration.reqStatus", "name": "status", "type": "uint8"} ], "name": "processRequest", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function"}, {"constant": false, "inputs": [{"internalType": "uint256", "name": "id", "type": "uint256"} ], "name": "requstToLandOwner", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function"}, {"constant": true, "inputs": [], "name": "viewAssets", "outputs": [{"internalType": "uint256[]", "name": "", "type": "uint256[]"} ], "payable": false, "stateMutability": "view", "type": "function"}, {"constant": true, "inputs": [{"internalType": "uint256", "name": "property", "type": "uint256"} ], "name": "viewRequest", "outputs": [{"internalType": "address", "name": "", "type": "address"} ], "payable": false, "stateMutability": "view", "type": "function"} ];
    
    var state=document.getElementById('state').value;
    var district=document.getElementById('district').value;
    var city=document.getElementById('city').value;
    var survey=document.getElementById('survey').value;
    var owner=document.getElementById('owner').value;
    var market=document.getElementById('market').value;

    
    landcontract=new web3.eth.Contract(abi,address);
    console.log('i m below constructor');
    landcontract.methods.computeId(state,district,city,12).call().then(function(id){
        web3.eth.getAccounts().then(function(accounts){
        console.log(accounts[0]);
        try{
        landcontract.methods.Registration(state,district,city,survey,owner,market,id).send({
            from :accounts[0]
        })
        }
        catch(error)
        {
            console.log(error);
        }
         landcontract.methods.landInfoUser(id).call().then(function(info){
            console.log(info);
         })
    })

    });
    

})