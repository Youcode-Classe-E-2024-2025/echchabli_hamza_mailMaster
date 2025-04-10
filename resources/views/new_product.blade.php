<!DOCTYPE html>
<html>
<head>
    <title>New Product Alert!</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f6f8;
            margin: 0;
            padding: 20px;
            color: #333;
        }
        .container {
            background-color: #fff;
            max-width: 600px;
            margin: auto;
            border-radius: 8px;
            padding: 30px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }
        h1 {
            color: #2c3e50;
        }
        .bgP{
            color: #333
        }
        p {
            line-height: 1.6;
        }
        a {
            display: inline-block;
            margin-top: 20px;
            padding: 12px 24px;
            background-color: #3498db;
            color: #fff;
            text-decoration: none;
            border-radius: 6px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>{{ $productName }}</h1>
        <p>We are excited to introduce our new product: <strong>{{ $productName }}</strong>!</p>
        <p>{{ $description }}</p>
        <a href=>Check it out now!</a>
        {{-- <img src="https://3d33-197-230-250-154.ngrok-free.app/api/email-tracker/6/2" width="1" height="1" /> --}}
    </div>
    </div>
</body>
</html>
