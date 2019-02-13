({
    clickLogin : function(component, event, helper) {
        console.log('hi');
        component.set("v.isOpen", true);
    },
    closeModal: function(component, event, helper){
        component.set("v.isOpen", false);
    }
})