const fs = require('fs');


const middleware = () => {
    return true;
}

class JSWEB {
    router(endpoint, middleware, callback) {
        let res_dict = {
            end: (text)=>{
                console.log(text)
            }
        }

        // ! method 1
        if (middleware()) {
            console.log(callback(endpoint,res_dict))
        }

    }
    render(path) {
        let file = fs.readFileSync(path, 'utf-8')
        return file;
    }
    launch(port, hostname, callback) {
        callback(port, hostname);
    }
}

let jw = new JSWEB();


// django style
jw.router('/', middleware, (req, res)=>{
    return jw.render('index.html')
})

// express style
jw.router('/', middleware, (req, res)=>{
    res.render('index.html')
})

jw.router('/contact', middleware, (req, res)=>{
    return jw.render('contact.html')
})

jw.router('/about', middleware, (req, res)=>{
    return jw.render('about.html')
})

jw.launch(3000, 'localhost', (port, hostname)=>{
    console.log(`App is running at http://${hostname}:${port}`);
})