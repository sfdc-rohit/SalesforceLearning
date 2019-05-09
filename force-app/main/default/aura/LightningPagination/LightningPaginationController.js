({
	doInit : function(component, event, helper) {
        component.set('v.columns',[
            {label: 'Name', fieldName: 'Name', type: 'text'},
            {label: 'Phone', fieldName: 'Phone', type: 'phone'},
            {label: 'Rating', fieldName: 'Rating', type: 'rating'}
        ]);
		helper.getAccounts(component, event);
	},
    onNext : function(component, event, helper){
        var pageNumber = component.get("v.currentPageNumber");
        component.set("v.currentPageNumber", pageNumber+1);
        helper.buildData(component);
    },
     onPrev : function(component, event, helper){
        var pageNumber = component.get("v.currentPageNumber");
        component.set("v.currentPageNumber", pageNumber-1);
        helper.buildData(component);
    },
    processMe : function(component, event, helper){
        component.set("v.currentPageNumber", parseInt(event.target.name));
        helper.buildData(component);
    },
    onFirst : function(component, event, helper){
        component.set("v.currentPageNumber", 1);
        helper.buildData(component);
    },
     onLast : function(component, event, helper){
        component.set("v.currentPageNumber", component.get("v.totalPages"));
        helper.buildData(component);
    },
})