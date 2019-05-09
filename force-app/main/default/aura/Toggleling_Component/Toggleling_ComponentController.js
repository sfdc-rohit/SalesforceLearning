({
    doInit : function(component, event, helper) {
        let buttonLeft = component.find("buttonLeft");
        buttonLeft.set("v.disabled",true);
        
        var action = component.get("c.getCases");
        action.setCallback(this, function(response){
            var state = response.getState();
            if(state === 'SUCCESS'){
                var caseList = response.getReturnValue();                               
                component.set("v.caseList", caseList);
                component.set("v.caseListLeft",caseList );
                component.set("v.totalCases", caseList.length);
                component.set("v.currentCase",caseList[0] );
                let buttonRight = component.find('buttonRight');
                var totalCases = component.get("v.totalCases");                
                if(totalCases == 0 || totalCases == 1){                    
                    buttonRight.set('v.disabled',true);
                }
            }
        });
        $A.enqueueAction(action);                        
    },
    clickLeft : function (component, event, helper){
        let buttonLeft = component.find("buttonLeft");
        let buttonRight = component.find("buttonRight");
        var currentCaseNumber = component.get("v.currentCaseNumber");
        var caseList = component.get("v.caseListLeft");
        currentCaseNumber--; 
        var currentCase = caseList[currentCaseNumber - 1];
        
        buttonRight.set("v.disabled", false);
        if(currentCaseNumber == 1){
            buttonLeft.set("v.disabled",true);
        }
               
        component.set("v.currentCase",currentCase );
        component.set("v.currentCaseNumber",currentCaseNumber);
    },
    clickRight : function(component, event, helper){
        let buttonLeft = component.find("buttonLeft");
        buttonLeft.set("v.disabled", false);
        var caseList = component.get("v.caseList");
        var currentCaseNumber = component.get("v.currentCaseNumber");
        var totalSize = component.get("v.totalCases");
        var currentCase;
        
        if(currentCaseNumber + 1 == totalSize){                        
            let buttonRight = component.find('buttonRight');
            buttonRight.set('v.disabled',true);           
        }
        currentCase = caseList[currentCaseNumber];
        currentCaseNumber++;        
        component.set("v.currentCase",currentCase );        
        component.set("v.currentCaseNumber",currentCaseNumber);
        
        // Event
        var togglingEvent = $A.get("e.c:TogglingEvent");
        togglingEvent.setParams({
            "message":"Hello World" 
        });
        togglingEvent.fire();
    }
})