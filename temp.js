setInterval(() => {
    console.log(new Date(), process.env.NODE_ENV);

    setTimeout(() => {
        process.exit();
    }, 15000);
}, 2000)
