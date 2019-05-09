({
	getAccounts : function(component, event) {
		var action = component.get("c.getAccounts");
        action.setParams({});
        action.setCallback(this, function(response){
            var state = response.getState();
            if(state === "SUCCESS"){
                var result = response.getReturnValue();
                var totalPages = Math.ceil(result.length/component.get("v.pageSize"));
                component.set("v.totalPages", totalPages);
                component.set("v.accountList", result);
                //console.log(JSON.stringify(component.get("v.accountList")));
                this.buildData(component);
            }
        });
        $A.enqueueAction(action);
	},
    buildData : function(component){
        var data = [];
        var pageNumber = component.get("v.currentPageNumber");
        var pageSize = component.get("v.pageSize");
        var allData = component.get("v.accountList");
        
        var x = (pageNumber - 1 ) * pageSize;
        
        for(; x<=(pageNumber)*pageSize; x++){
            if(allData[x]){
                data.push(allData[x]);
            }
        }
        component.set('v.data', data);
        this.generatePageList(component, pageNumber);
    },
     
    generatePageList : function(component, pageNumber){
        pageNumber = parseInt(pageNumber);
        var pageList = [];
        var totalPages = component.get("v.totalPages");
        if(totalPages > 1){
            if(totalPages <= 10){
                var counter = 2;
                for(; counter < totalPages; counter++){
                    pageList.push(counter);
                }
            } else {
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