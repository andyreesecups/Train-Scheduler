  $(document).ready(function() {


      // Initialize Firebase
      var config = {
          apiKey: "AIzaSyDjWp1HgclRizcS2C_NN-2fZ53ZnrO5tUI",
          authDomain: "train-project-35fa1.firebaseapp.com",
          databaseURL: "https://train-project-35fa1.firebaseio.com",
          storageBucket: "train-project-35fa1.appspot.com",
          messagingSenderId: "556153709076"
      };

      firebase.initializeApp(config);

      var database = firebase.database();

      // Initialize Variables
      var trainName;
      var destination;
      var trainTime;
      var frequency;
      var nextArrival;
      var minutesAway;

      // When customer clicks the submit button
      $("#submit-button").on("click", function(event) {

          // Get the customer input values
          trainName = $("#name").val().trim();
          destination = $("#destination").val().trim();
          trainTime = $("#train-time").val().trim();
          frequency = parseInt($("#frequency").val().trim());

          // console.log user values 
          console.log(trainName + " " + destination + " " + frequency + trainTime);


          // Adding user input to database
          database.ref().push({
              trainName: trainName,
              destination: destination,
              frequency: frequency,
              trainTime: trainTime,
              dateAdded: firebase.database.ServerValue.TIMESTAMP

          });
      }); // end submit button click function

      database.ref().on("child_added", function(snapshot) {
              $("#name").html(snapshot.val().trainName);
              $("#destination").html(snapshot.val().destination);
              $("#frequency").html(snapshot.val().frequency);
              $("#train-time").val().trim();

              var trainAppend = $("<tr>");
              trainAppend.append("<td>" + snapshot.val().trainName + "</td>");
              trainAppend.append("<td>" + snapshot.val().destination + "</td>");
              trainAppend.append("<td>" + snapshot.val().frequency + "</td>");
              trainAppend.append("<td>" + snapshot.val().trainTime + "</td>");
              trainAppend.append("<td>" + snapshot.val().nextArrival + "</td>");
              trainAppend.append("<td>" + snapshot.val().minutesAway + "</td>");
              $("#train-table").append(trainAppend);


          },
          function(errorObject) {
              console.log("errors handled:" + errorObject.code);
          });

  });
