<!DOCTYPE html>
<html>
<head>
    <title>Special Discount Just for You!</title>
    <style>
        body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            background-color: #fdfaf6;
            margin: 0;
            padding: 20px;
            color: #333;
        }
        .container {
            background-color: #ffffff;
            max-width: 600px;
            margin: auto;
            border-radius: 8px;
            padding: 30px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.07);
        }
        h1 {
            color: #e67e22;
        }
        p {
            font-size: 16px;
            line-height: 1.5;
        }
        a {
            display: inline-block;
            margin-top: 20px;
            padding: 12px 24px;
            background-color: #e67e22;
            color: white;
            text-decoration: none;
            border-radius: 6px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Exclusive Offer: {{ $discount }} OFF!</h1>
        <p>{{$productName}} Don't miss this opportunity to save on your favorite items.</p>
        <p>{{ $description }}</p>
        <a href="{{ $link }}">Shop Now</a>
        <img src="{{ url('/email-tracker/' . $userId . '/' . $campaignId) }}" width="1" height="1" style="display:none;">

    </div>
</body>
</html>
