<!DOCTYPE html>
<html>
  <head>
    <title>PHP Outlook Sample</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">
    <style media="screen">
    body {
      padding-top: 70px;
      padding-bottom: 30px;
      }
    </style>
  </head>
  <body>
    <nav class="navbar navbar-inverse navbar-fixed-top">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">PHP Outlook Sample</a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
          <ul class="nav navbar-nav">
            <li class="<?php echo ($_SERVER['REQUEST_URI'] == '/' ? 'active' : '');?>"><a href="/">Home</a></li>
            <li class="<?php echo ($_SERVER['REQUEST_URI'] == '/mail' ? 'active' : '');?>"><a href="/mail">Inbox</a></li>
          </ul>
          <?php if(isset($username)) { ?>
          <ul class="nav navbar-nav navbar-right">
            <li><p class="navbar-text">Hello <?php echo $username ?>!</p></li>
          </ul>
          <?php } ?>
        </div><!--/.nav-collapse -->
      </div>
    </nav>

    <div class="container" role="main">
      <div class="jumbotron">
    <h1>PHP Outlook Sample</h1>
    <p>This example shows how to get an OAuth token from Azure using the <a href="https://docs.microsoft.com/en-us/azure/active-directory/develop/active-directory-v2-protocols-oauth-code" target="_blank">authorization code grant flow</a> and to use that token to make calls to the Outlook APIs in the <a href="https://developer.microsoft.com/en-us/graph/" target="_blank">Microsoft Graph</a>.</p>
    <p>
      <a class="btn btn-lg btn-primary" href="/signin" role="button" id="connect-button">Connect to Outlook</a>
    </p>
  </div>
    </div>

    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
  </body>
</html>
