public class PincodeIntegrationClass {
    
    @AuraEnabled
    public static JSONResponse findFullInfo(Integer pincode){
        JSONResponse JSONResponseObject = new JSONResponse();
        HttpRequest req = new  HttpRequest();
        req.setEndpoint('http://postalpincode.in/api/pincode/'+pincode);
        req.setmethod('GET');
        http p = new http();
        HttpResponse res=p.send(req);
        if(res.getStatusCode()== 200){
            JSONResponseObject = (JSONResponse) JSON.deserialize(res.getBody(), JSONResponse.class);            
        }
        return JSONResponseObject;
    }
    public class JSONResponse{
        @AuraEnabled public String message;
        @AuraEnabled public String status;
        @AuraEnabled public list<PostOffice> postoffice;
    }
    public class PostOffice{
        @AuraEnabled public string Name;
        @AuraEnabled public string Description; 
        @AuraEnabled public string BranchType;
        @AuraEnabled public string DeliveryStatus;
        @AuraEnabled public string Taluk;
        @AuraEnabled public string Circle;
        @AuraEnabled public string District;
        @AuraEnabled public string Division;
        @AuraEnabled public string Region;
        @AuraEnabled public string State;
        @AuraEnabled public string Country;
        
    }
}