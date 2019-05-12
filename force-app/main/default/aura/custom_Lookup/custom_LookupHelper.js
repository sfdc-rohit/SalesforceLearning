({
	searchHelper : function(component,event,getInputkeyWord) {
	  // call the apex class method 
     var action = component.get("c.fetchLookUpValues");
      // set param to method  
        action.setParams({
            'searchKeyWord': getInputkeyWord,
            'ObjectName' : component.get("v.objectAPIName")
          });
      // set a callBack    
        action.setCallback(this, function(response) {
          $A.util.removeClass(component.find("mySpinner"), "slds-show");
            var state = response.getState();
            if (state === "SUCCESS") {
                var storeResponse = response.getReturnValue();
              // if storeResponse size is equal 0 ,display No Result Found... message on screen.                }
                if (storeResponse.length == 0) {
                    component.set("v.Message", 'No Result Found...');
                } else {
                    component.set("v.Message", '');
                }
                // set searchResult list with return value from server.
                component.set("v.listOfSearchRecords", storeResponse);
            }
 
        });
      // enqueue the Action  
        $A.enqueueAction(action);
    
	},
    saveNewAccount: function(component, account){
        console.log("in helper");
        var action = component.get("c.saveNewAccountObject");
        action.setParams({
            'accountObj': account
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            if(state === "SUCCESS"){
                console.log("successfullu Account saved");
            }
        });
        $A.enqueueAction(action);
    },
    findRelatedContacts : function(component, selectedAccountGetFromEvent){
        console.log("in helper find Related contact");
        var action = component.get("c.findContacts");
        action.setParams({
            'accountObj': selectedAccountGetFromEvent
        });
        action.setCallback(this, function(response){
            var state = response.getState();
         
            if (state === "SUCCESS"){
                var result = response.getReturnValue();
                var totalPages = Math.ceil(result.length/component.get("v.pageSize"));
                component.set("v.totalPages", totalPages);
                component.set("v.fullContactList", result);
                this.generateData(component);
            }
            
        });
        $A.enqueueAction(action);
    },
     
    generateData : function(component){
        var data = [];
       	var currentPage = component.get("v.currentPageNumber");
        var pageSize = component.get("v.pageSize");
        var allContacts = component.get("v.fullContactList");
        
        for(var x = (currentPage - 1)* pageSize ; x<(currentPage * pageSize); x++){
            if(allContacts[x]){
                data.push(allContacts[x]);
            }
        }
        component.set("v.contactsToDisplayPerPage",data);
        this.generatePageList(component, currentPage);
        component.set("v.isContact", true);
    },
   
    generatePageList : function(component, pageNumber){
        var pageList = [];
        pageNumber = parseInt(pageNumber);
        var totalPages = component.get("v.totalPages");
        if(totalPages > 1 ){
            if(totalPages <= 10 ){
                for(var c=2; c<totalPages;c++){
                    pageList.push(c);
                }
              
            }else {
                if(pageNumber < 5 ){
                    pageList.push(2, 3, 4 , 5 , 6);
                } else {
                    if( pageNumber > (totalPages - 5)){
                        pageList.push(totalPages-5, totalPages-4, totalPages-3, totalPages-2, totalPages-1);
                    } else {
                        pageList.push(pageNumber-2, pageNumber-1, pageNumber, pageNumber+1, pageNumber+2)
                    }
                  }
              }
        }
        component.set("v.pageList", pageList);
    },
})