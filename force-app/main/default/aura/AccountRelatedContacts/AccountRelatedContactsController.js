({
    doInit : function(component, event, helper) {
        
        
        var action = component.get('c.findAccountRelatedContacts');
        
        
        
        action.setCallback(this, function(response){
            
            var state = response.getState();
            if(state = 'SUCCESS'){
                
                var result = response.getReturnValue();                                
                
                var lst = response.getReturnValue();
               // console.log('## '+JSON.stringify(lst));
                for(var i = 0 ; i < lst.length ; i++){
                    lst[i].currentViewLimit = component.get('v.currentViewLimit');
                    lst[i].viewLimit = lst[i].contactList.length;
                }
                console.log('##@ '+JSON.stringify(lst));
                component.set('v.objList', lst); 
                component.set('v.length', response.getReturnValue().length);				
            }
            
        });
        
        $A.enqueueAction(action);
    },
    onClickLoadView : function(component, event, helper) {
        console.log('onClickLoadView '+event.target.name);
        
        var activeSubs = component.get('v.objList');
        for(var i=0; i<activeSubs.length; i++){
            if(activeSubs[i].acc.Id == event.target.name){
                activeSubs[i].currentViewLimit =  activeSubs[i].currentViewLimit + component.get('v.currentViewLimit');
                break;
            }
        }
        console.log('onClickLoadView ');
        component.set('v.objList', activeSubs);
    },
    onClickLoadViewCollapse : function(component, event, helper) {
        console.log('onClickLoadView '+event.target.name);
        
        var activeSubs = component.get('v.objList');
        for(var i=0; i<activeSubs.length; i++){
            if(activeSubs[i].acc.Id == event.target.name){
                activeSubs[i].currentViewLimit = component.get('v.currentViewLimit');
                break;
            }
        }
        component.set('v.objList', activeSubs);
	},
    scriptsLoaded: function(component, event, helper) {
        //alert('he');
    }
    
})