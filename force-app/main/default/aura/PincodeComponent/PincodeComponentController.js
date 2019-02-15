({
	handleClick : function(component, event, helper) {
		var pincode = component.get("v.pincode");
        console.log(pincode);
        var action = component.get("c.findFullInfo");
        action.setParams({
            pincode : component.get("v.pincode")
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            if(state === "SUCCESS"){
                component.set("v.numberOfPostOffice",response.getReturnValue().message);
                var postOfficesdetail = response.getReturnValue().postoffice;
				component.set("v.postOfficesdetail", postOfficesdetail);
            }
        });
        $A.enqueueAction(action);
	}
})