<!DOCTYPE HTML>
<html lang="en">

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">

    <!-- Link to CSS -->
    <link rel="stylesheet" href="../CSS/index.css" type="text/css" />

    <!-- Page Content -->
    <title>DHOSIO REGENCY QUIZ</title>
    <link rel="icon" type="image/jpg" href="../Images/WebsiteLogo.jpg">

</head>

<body>

    <?php
  // define variables and set to empty values
  $firstName = "";
  $lastName = "";
  $fullName = "";
  $gender = "";
  $transportMeans = "";
  $addedInfo = "";


  if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $firstName = $_POST["firstName"];
    $lastName = $_POST["lastName"];
    $gender = $_POST["gender"];
    $transportMeans = $_POST["transport"];

    if ($firstName == "" || $lastName == ""){
        $fullName = "No names entered.";
    } else {
        $fullName = $firstName . " " . $lastName;
    }

    // For the gender drop down
    if($gender == ""){
      $gender = "Not provided.";
    }

    if($transportMeans == ""){
        $transportMeans = "Must select at least one.";
    }

    // For the checkboxes
    if(!empty($_POST["addedInfo"])){
      foreach ($_POST["addedInfo"] as $info){
        $addedInfo = $addedInfo . " " . $info;
      }
    }
    else{
      $addedInfo = "No additional information.";
    }

  }

  ?>

    <div class="container-fill">

        <!-- Header -->
        <div class="header">

            <a href="../index.html">
                <img id="websiteLogo" src="../Images/WebsiteLogo.jpg" alt="Website Logo" width="100px" height="100px" />
            </a>

            <div class="name_and_moto">
                <h1 class="websiteName">DHOSIO REGENCY</h1>
                <p class="websiteMoto">Your Comfort, Our Top Priority</p>
            </div>

        </div>

        <!-- The actual form -->
        <div class="survey_form">

            <h4>Kindly fill in the survey below:</h4>

            <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>" method="post" class="survey">

                <span class="label"> First Name: </span> <br>
                <input type="text" name="firstName" id="userFirstName">

                <span class="label"> Last Name: </span> <br>
                <input type="text" name="lastName" id="userLastName">

                <span class="label"> Gender: </span> <br>
                <select name="gender" id="userGender">
                    <option value="">Select...</option>
                    <option value="Male">Male.</option>
                    <option value="Female">Female.</option>
                    <option value="Prefer not to say">Prefer not to say.</option>
                </select>

                <br>

                <span class="label"> Preferred means of transport: </span> <br>
                <input type="radio" name="transport" value="Motorcycle" checked="checked">Motorcycle</input>
                <input type="radio" name="transport" value="Car">Car</input>
                <input type="radio" name="transport" value="Public Transport">Public Transport</input>
                <input type="radio" name="transport" value="Train">Train</input>

                <br>

                <span class="label"> Additonal Information: </span> <br>
                <input type="checkbox" name="addedInfo[]" value="Coming with child(ren),">Coming with child(ren)</input>
                <br>
                <input type="checkbox" name="addedInfo[]" value="Need touring service,">Need touring service</input>
                <br>
                <input type="checkbox" name="addedInfo[]" value="Requires extra parking space,">Requires extra parking space</input>
                <br>
                <input type="checkbox" name="addedInfo[]" value="Interest in travel package,">Interest in travel
                package</input> <br>

                <br>

                <span class="label"> Personal Message: </span> <br>
                <input type="textarea" name="personalMessage" id="personalMessage"
                    placeholder="What would you like us to know...">

                    <div class="buttons">
                        <input type="submit" class="btn btn-success" name="submitButton" id="submitButton" value="Submit" onclick="submitForm()">
                        <input type="reset" class="btn btn-danger"name="reset" id="clearButton" value="Reset" onclick="clearForm()">
                    </div>

            </form>

            <!-- Display PHP Output -->
            <?php

      echo "<br>";
      echo "<h2>Your Details Provided Are :</h2>";
      echo "<p> Your full name is: <span>" . $fullName . "</span></p>";
      echo "<br>";
      echo "<p> Gender: <span>" . $gender. "</span></p>";
      echo "<br>";
      echo "<p> Prefered means of transport: <span>" . $transportMeans . "</span></p>";
      echo "<br>";
      echo "<p>Your additonal information: <span>" . $addedInfo . "</span></p>";

      ?>

        </div>

        <!-- Footer -->
        <footer>
            <div class="footer">

                <a href="index.html">
                    <img src="../Images/WebsiteLogo.jpg" alt="Hotel Logo" title="Hotel Logo" height="100px"
                        width="100px" style="border-radius: 10px;" />
                </a>

                <div class="footer_body">

                    <div class="footer_body_item">
                        <h5 class="footer_header">Links</h5>
                        <ul class="links">
                            <li><a href="privacypolicy.html">Privacy Policy</a></li>
                            <li><a href="termsofservice.html">Terms of Service</a></li>
                        </ul>
                    </div>

                    <div class="footer_body_item">
                        <h5 class="footer_header">Contacts</h5>
                        <ul class="links">
                            <li> <a href="tel:+23057118407">+23057118407 </a> </li>
                            <li> <a href="mailto:info@dhosioregency.com">info@dhosioregency.com </a> </li>
                        </ul>
                    </div>

                    <div class="footer_body_item">
                        <h5 class="footer_header">Address</h5>
                        <ul class="links">
                            <li>2nd Floor</li>
                            <li>Plasma Building, Karen</li>
                            <li>Nairobi, Kenya</li>
                        </ul>
                    </div>

                </div>

            </div>

            <div class="socials">

                <p class="socials_header">
                    &copy; 2022 Dhosio Regency - All rights reserved.
                </p>

                <ol class="social_links">
                    <a href="https://www.instagram.com/"><img class="social_link" src="../Images/instagram_icon.png"
                            height="35px" width="35px" alt="Instagram" title="Instagram Link"></a>
                    <a href="https://www.linkedin.com/login"><img class="social_link" src="../Images/linkedin_icon.png"
                            height="35px" width="35px" alt="LinkedIn" title="LinkedIn Link"></a>
                    <a href="fhttps://twitter.com/login?lang=en"><img class="social_link"
                            src="../Images/twitter_icon.png" height="35px" width="35px" alt="Twitter"
                            title="Twitter Link"></a>
                </ol>

            </div>
        </footer>

    </div>

    <!-- Bootstrap Js -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous">
    </script>

    <!-- Sweet alert script -->
    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>

</body>

</html>