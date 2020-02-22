App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',

  init: function () {
    // body...  
    return App.initWeb3();
  },

  initWeb3:function () {
    // body...

    if (typeof web3 !=='undefined') {
      App.web3Provider=web3.currentProvider;  
      web3 = new Web3(web3.currentProvider);
      console.log("initWeb3")
    }
    else{
      App.web3Provider =new Web3.providers.HttpProvider('http://localhost:8545');
      web3 = new Web3(App.web3Provider); 
    }
    return App.initContract();
  },

  initContract :function(){
    $.getJSON("landRegistration.json",function(landRegistration){

    App.contracts.landRegistration=TruffleContract(landRegistration);
    App.contracts.landRegistration.setProvider(App.web3Provider);
    console.log("initContract")
    return App.render();
    });
  },
  render :function(){
    var landInstance;
    var loader=$("#loader");
    var content=$("#content");
    
    loader.show();
    content.show();

    web3.eth.getCoinbase(function(err,account){
      if(err===null){
        App.account=account;
        $("#accountAddress").html("Your account : "+account);
      }
      else
      {
        console.log(err);
      }
    });  
    App.contracts.landRegistration.deployed().then(function(instance){
        landInstance=instance;
        return landInstance.computeId.call('kerala','malappuram','anakkayam',200)
    }).then(function(id){
        landInstance.landInfoUser.call(id).then(function(i){
            console.log(i[3]);
    });
      
        
    });

  }

};


// $(function(){
//     $(window).load(function(){
//         App.init();
//     });
// });



/*
  init: async function() {
    // Load pets.
    $.getJSON('../pets.json', function(data) {
      var petsRow = $('#petsRow');
      var petTemplate = $('#petTemplate');

      for (i = 0; i < data.length; i ++) {
        petTemplate.find('.panel-title').text(data[i].name);
        petTemplate.find('img').attr('src', data[i].picture);
        petTemplate.find('.pet-breed').text(data[i].breed);
        petTemplate.find('.pet-age').text(data[i].age);
        petTemplate.find('.pet-location').text(data[i].location);
        petTemplate.find('.btn-adopt').attr('data-id', data[i].id);

        petsRow.append(petTemplate.html());
      }
    });

    return await App.initWeb3();
  },

  initWeb3: async function() {
    /*
     * Replace me...
     

    return App.initContract();
  },

  initContract: function() {
    /*
     * Replace me...
     

    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-adopt', App.handleAdopt);
  },

  markAdopted: function(adopters, account) {
    /*
     * Replace me...
     
  },

  handleAdopt: function(event) {
    event.preventDefault();

    var petId = parseInt($(event.target).data('id'));

    /*
     * Replace me...
     
  }

};*/

$(function() {
  $(window).load(function() {
    App.init();
  });
});
