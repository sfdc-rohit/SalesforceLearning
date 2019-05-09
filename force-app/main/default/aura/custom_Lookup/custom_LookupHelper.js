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
          /*  if(state === "SUCCESS"){
                console.log("successfully Contacts Found");
                console.log("##  "+JSON.stringify(response.getReturnValue()));
                component.set("v.contactList", response.getReturnValue());
                component.set("v.data", response.getReturnValue());
                component.set("v.isContact", true);
            }*/
            if (state === "SUCCESS"){
                var oRes = response.getReturnValue();
                if(oRes.length > 0){
                    component.set('v.contactList', oRes);
                    var pageSize = component.get("v.pageSize");
                    var totalRecordsList = oRes;
                    var totalLength = totalRecordsList.length ;
                    component.set("v.totalRecordsCount", totalLength);
                    component.set("v.startPage",0);
                    component.set("v.endPage",pageSize-1);
                    
                    var PageList = [];
                    for(let i=0; i<Math.ceil(totalLength / pageSize); i++){
                        PageList.push(i+1);
                       
                    }
                     component.set("v.pageList", PageList);
                    console.log('## '+JSON.stringify(component.get("v.pageList")));
                    
                    var PaginationLst = [];
                    for(var i=0; i < pageSize; i++){
                        if(component.get("v.contactList").length > i){
                            PaginationLst.push(oRes[i]);    
                        } 
                    }
                    component.set('v.PaginationList', PaginationLst);
                    console.log(JSON.stringify(component.get('v.PaginationList')))
                    component.set("v.selectedCount" , 0);
                    //use Math.ceil() to Round a number upward to its nearest integer
                    component.set("v.totalPagesCount", Math.ceil(totalLength / pageSize));
                    component.set("v.isContact", true);
                    
                }else{
                    // if there is no records then display message
                    component.set("v.bNoRecordsFound" , true);
                    component.set("v.isContact", true);
                } 
            }
            else{
                alert('Error...');
            }
        });
        $A.enqueueAction(action);
    },
     // navigate to next pagination record set   
    next : function(component,event,sObjectList,end,start,pageSize){
        var Paginationlist = [];
        var counter = 0;
        for(var i = end + 1; i < end + pageSize + 1; i++){
            if(sObjectList.length > i){ 
             //   if(component.find("selectAllId").get("v.value")){
             //       Paginationlist.push(sObjectList[i]);
              //  }else{
                    Paginationlist.push(sObjectList[i]);  
               // }
            }
            counter ++ ;
        }
        start = start + counter;
        end = end + counter;
        component.set("v.startPage",start);
        component.set("v.endPage",end);
        component.set('v.PaginationList', Paginationlist);
    },
   // navigate to previous pagination record set   
    previous : function(component,event,sObjectList,end,start,pageSize){
        var Paginationlist = [];
        var counter = 0;
        for(var i= start-pageSize; i < start ; i++){
            if(i > -1){
               // if(component.find("selectAllId").get("v.value")){
               //     Paginationlist.push(sObjectList[i]);
               // }else{
                    Paginationlist.push(sObjectList[i]); 
                //}
                counter ++;
            }else{
                start++;
            }
        }
        start = start - counter;
        end = end - counter;
        component.set("v.startPage",start);
        component.set("v.endPage",end);
        component.set('v.PaginationList', Paginationlist);
    },
})