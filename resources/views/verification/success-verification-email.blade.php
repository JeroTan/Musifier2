<!DOCTYPE html>
<html lang="en" style="position:relative; height:100%">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <link rel="icon" type="image/icon" href="favicon.ico" />
    <title>Musifier</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

        .text{
            font-family: "Poppins", sans-serif;
            font-weight: 400;
            font-style: normal;
            margin-top: 1px;
            text-align: center;
        }
        .text-big{
            color: blue;
            font-family: "Poppins", sans-serif;
            font-weight: 600;
            font-style: normal;
            margin-bottom: 1px;
            text-align: center;
        }
    </style>

</head>
<body style=" height: 100%; position:relative; ">
    <main style="position: relative;">
        <section>
            <h3 class="text-big"> Account Verification Success </h3>
            <p class="text"> Redirecting you in the main page in 5 seconds. . . </p>
            <small class="text" style="display:block;">If you haven't redirected yet, go to this <a aria-label="link to mainpage" href="{{url('/')}}"> link</a>.</small>
        </section>
        <script>
            let timer = setTimeout(() => {
                location.href = "{{url("/")}}"
                clearInterval(timer);
            }, 5000);
        </script>
    </main>
</body>
</html>
