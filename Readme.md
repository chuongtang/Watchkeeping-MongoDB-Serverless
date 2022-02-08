
# Watchkeeping: a timesheet compiling tool for Seafarers
### A runner-up project in <img src="https://chuongtang.github.io/sourceStore/GenSources/MongoDBHackathon.jpg" alt="Hackathon Banner" title="Hackathon Runner-up" height="40" />

One of a great ways to experience all pros and cons of any technologies is using them to build app. In this project, I've dived into a trending tool from MongoDB : Realm serverless functions


<!-- ![Logo](https://chuongtang.github.io/sourceStore/logos/Realm.png) -->
<img src="https://chuongtang.github.io/sourceStore/logos/Realm.png" alt="Realm"
	title="Realm logo" height="80" />

## Tech Stack

**Client:** 
  * <img src="https://chuongtang.github.io/sourceStore/logos/Vite.png" alt="VITE"
	title="VITE logo" height="20" /> [VITE:](https://vitejs.dev) superfast frontend tool to render <img src="https://chuongtang.github.io/sourceStore/logos/React.png" alt="React"
	title="React logo" height="20" /> React 

  * <img src="https://chuongtang.github.io/sourceStore/logos/Prime.png" alt="Prime"
	title="Prime logo" height="20" /> [PrimeREACT: ](https://www.primefaces.org/primereact) design-agnostic, flexible and accessible React UI Components.

**Serverless:** 
  * <img src="https://chuongtang.github.io/sourceStore/logos/Realm.png" alt="Realm"
	title="Realm logo" height="20" /> [Application Services: ](https://www.mongodb.com/realm/appdev) A ready-to-go back end.

**Database:**
  * <img src="https://chuongtang.github.io/sourceStore/logos/MongoDB.png" alt="MongoDB"
	title="MongoDB logo" height="20" /> [MongoDB Atlas: ](https://www.mongodb.com/atlas/database) multi-cloud database services.
  
**Frontend User Authorization:** Autho0
  * <img src="https://chuongtang.github.io/sourceStore/logos/Auth0.png" alt="Auth0"
	title="Auth0 logo" height="20" /> [Auth0: ](https://auth0.com) A drop-in solution to add authentication and authorization services.

**Backend Serverless User Authorization:** 
  * <img src="https://chuongtang.github.io/sourceStore/logos/MongoDB.png" alt="MongoDB"
	title="MongoDB logo" height="20" /> [MongoDB API Key: ](https://docs.mongodb.com/realm/authentication/api-key/#overview) MongoDB Realm provides several authentication providers that you can integrate into a client application to allow users to log in to your Realm app. Server API keys are generated in the Realm UI. Creating a server API key associates that API key with an automatically created Realm server user. Provide a server key to external applications and services to allow them to authenticate directly with Realm.

**PDF rendering tool**
* [html2pdf.js: ](https://github.com/eKoopmans/html2pdf.js) Client-side HTML-to-PDF rendering using pure JS.

**Deployment** 
  * <img src="https://chuongtang.github.io/sourceStore/logos/Realm.png" alt="MongoDB Realm"
	title="MongoDB Realm logo" height="20" /> [MongoDB Realm ](https://docs.mongodb.com/realm/hosting/) Just drop your build-files into the hoistings directory. Realm allows you to host, manage, and serve your application's static media and document files. Just drop your build-files into the hoistings directory

## Demo

**Setting up Realm function in MongoDB**

<img src="https://chuongtang.github.io/sourceStore/GenSources/DemoRealmFunctions.png" alt="Realm demo"	title="Realm demo function" style="margin-bottom: 2rem" height="500" />



**Logging-in MongoDB Realm from client**

```bash
    const REALM_APP_ID = import.meta.env.VITE_REALM_APP_ID;
    const REALM_APP_APIKEY = import.meta.env.VITE_REALM_APP_APIKEY;

    useEffect(async () => {

    const app = new Realm.App({ id: REALM_APP_ID });
    const credentials = Realm.Credentials.apiKey(REALM_APP_APIKEY);

    try {
      setMongoUser(loggedInUser)
    } catch (error) {
      console.error(error);
    }
  }, []);
```

**Calling Realm functions from React front-end**

```bash
    const updateCrewDetail = async (newDetail) => {
        const updatedCrew = await user.functions.FindOneAndUpdate(newDetail);
  };
```

**Deployment**

<a href="shiptime-backend-zjsnd-aavqu.mongodbstitch.com" target="_blank">
<img src="https://chuongtang.github.io/sourceStore/GenSources/Logo.png" alt="Live preview"	title="App deployment on Realm"  height="20" /> Watchkeeping
</a>

## License

<a href="https://www.apache.org/licenses/LICENSE-2.0" target="_blank">
<img src="https://img.shields.io/badge/License-APACHE%20LICENSE%2C%20VERSION%202.0-green" alt="Apache License"	title="Apache licenses Apache Software"  height="20" />
</a>

## Feedback

If you have any feedback, please reach out to me at email@chuongtang.com