
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("hello", function(request, response) {
  var client = require('twilio')('AC4eade14dc425607dbda5ed10afe31e42', '9ec495bd809bce37a729652257824066');

// Send an SMS message
client.calls.create({
    to:'+16198176786',
    from: '+18588882432',
    body: 'Hello world!'
  }, function(err, responseData) { 
    if (err) {
      response.success(err);
    } else { 
      console.log(responseData.from); 
      console.log(responseData.body);
      response.success("Hello world!");
    }
  }
);
  
});
Parse.Cloud.define("deleteobject", function(request, response) {
                   var objectname = request.params.objectname;
                   var objectid = request.params.objectid;
                   var myobject = Parse.Object.extend(objectname);
                   if(objectid != ""){ // first need to check if the objectId exist
                   var query = new Parse.Query(myobject);
                   query.get(objectid, {
                             success: function(myobject) {
                                myobject.destroy({
                                      success: function(myobject) {
                                          console.log("object deleted succesfully");
                                          response.success("deleted");
                                      },
                                      error: function(myObject, error) {
                                         console.log("object delete failed");
                                         response.error();
                                      }
                                 });
                             },
                             error: function(object, error) {
                             console.log("delete object not found");
                             response.error();
                             }
                    });
                   
                   }
});
Parse.Cloud.define("saveobject", function(request, response) {
    var objectname = request.params.objectname;
    var values = request.params.objectvalue;
    var objectid = request.params.objectid;
    var Myobject = Parse.Object.extend(objectname);
                   console.log(request.params);
    if(objectid == ""){ // first need to check if the objectId exist
    var myinstance = new Myobject();
    for(key in values){
    if (values.hasOwnProperty(key)){
        myinstance.set(key,values[key]);
    }
    }
    myinstance.save(null, {
        success: function(myinstance) {
        // Execute any logic that should take place after the object is saved.
                    console.log(objectname + " obj saved successfully");
                    response.success();
        },
        error: function(myinstance, error) {
        // Execute any logic that should take place if the save fails.
        // error is a Parse.Error with an error code and message.
            console.log("Failed to save: " + objectname);
            response.error(error);
        }
    });
    }// end of if
    // if exists, it means we are editting the object, not new object
    else{
       var query = new Parse.Query(Myobject);
       query.get(objectid, {
         success: function(myinstance) {
                 for(key in values){
                 if (values.hasOwnProperty(key)){
                 myinstance.set(key,values[key]);
                 }
                 }
                 myinstance.save(null, {
                     success: function(myinstance) {
                     // Execute any logic that should take place after the object is saved.
                     console.log(objectname + " obj saved successfully");
                     response.success();
                     },
                     error: function(gameScore, error) {
                     // Execute any logic that should take place if the save fails.
                     // error is a Parse.Error with an error code and message.
                         console.log("Failed to save: " + objectname);
                         response.error();
                     }
                 });
         },
         error: function(object, error) {
         // The object was not retrieved successfully.
         // error is a Parse.Error with an error code and message.
                 response.error(error);
         }
     });
    }
});
Parse.Cloud.define("sinch", function(request, response) {
                   var sinchAuth = require('sinch-auth');
                   
                   var sinchSms = require('sinch-messaging');
                   
                   var auth = sinchAuth("c202a9fc-7742-4a3b-ba26-494243a92745", "VMphZrR67kyn9qpV1EAOqA==");
                   
                   sinchSms.sendMessage("+18588882432", "Hello world!");
});

Parse.Cloud.define("getobject", function(request, response) {
                   var objectname = request.params.objectname;
                   var Myobject = Parse.Object.extend(objectname);
                   var query = new Parse.Query(Myobject);
                   query.find({
                              success: function(objects) {
                                  response.success(objects);
                              },
                              error: function(object, error) {
                                  console.log(error);
                                  response.fail("fail");
                              }
                  });
   });

// validate the student info before saving it
// set auto incrment id
Parse.Cloud.beforeSave("Student", function(request, response) {
                       // check if the record exists if exists, just return success
                       // this is done by query the studentid, since the id does not exist
                       // for new record, it's only inserted here
                       var studentid = request.object.get("studentid");
                       if(studentid != undefined) {
                                response.success();
                        }
                       else{
                                 // set the last name to uppercase
                                 var lastname = request.object.get("lastname");
                                 if(lastname != undefined){
                                 lastname = lastname.toUpperCase();
                                 console.log("lastname:"+lastname);
                                 request.object.set("lastname",lastname);
                                 }
                                 var currentDate = new Date();
                                 query = new Parse.Query("Student");
                                 query.lessThanOrEqualTo("createdAt", currentDate);
                                 query.descending("createdAt");
                                 query.first({
                                   success: function(result) {
                                   // if there is no record yet, the result will be undefine, set the studentid to 1 for the first item
                                   if (result === undefined) {
                                   console.log("result if undefined");
                                   request.object.set("studentid",1);
                                   }
                                   else{
                                   console.log(result.get("studentid"));
                                   request.object.set("studentid", (result.get("studentid") + 1));
                                   }
                                   response.success();
                                   },
                                   error: function() {
                                   response.error("error");

                                   }
                                 });
                         }
        
});
// count object this function counts the total number of object of a class
Parse.Cloud.define("countobject", function(request, response) {
  var objectname = request.params.objectname;
  var Myobject = Parse.Object.extend(objectname);
  var query = new Parse.Query(Myobject);
  query.count({
    success: function(count) {
      response.success(count);
    },
    error: function(error){
      response.error("error");
    }
  })
});