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
      var minutesAway;

      // When customer clicks the submit button
      $("#submit-button").on("click", function(event) {

          // Get the customer input values
          trainName = $("#name").val().trim();
          destination = $("#destination").val().trim();
          trainTime = moment($("#train-time").val().trim(), "HH:mm").format("X");
          frequency = $("#frequency").val().trim();
          console.log("moment " + moment());

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
          // Clears input elements
          $("#name").val("");
          $("#destination").val("");
          $("#train-time").val("");
          $("#frequency").val("");

      }); // end submit button click function

      database.ref().orderByChild("dateAdded").on("child_added", function(snapshot) {

              // Capturing the current child 
              var trainName = snapshot.val().trainName;
              var destination = snapshot.val().destination;
              var frequency = snapshot.val().frequency;
              var trainTime = snapshot.val().trainTime;

              var differenceTime = moment().diff(moment.unix(trainTime), "minutes");
              var timeRemainder = differenceTime % frequency;
              var minutes = frequency - timeRemainder;
              var arrivalTime = moment().add(minutes, "m").format("hh:mm A");

              var trainAppend = $("<tr>");
              trainAppend.append("<td>" + trainName + "</td>");
              trainAppend.append("<td>" + destination + "</td>");
              trainAppend.append("<td>" + frequency + "</td>");
              trainAppend.append("<td>" + arrivalTime + "</td>");
              trainAppend.append("<td>" + minutes + "</td>");
              $("#train-table").append(trainAppend);



          },


          function(errorObject) {
              console.log("errors handled:" + errorObject.code);
          });

  });
