var BASE_PATH = location.href.replace(/[^/]*$/, '');
var UPLOADS_DIR = BASE_PATH + '/uploads/';
var THUMB_PATH = UPLOADS_DIR + 'thumb/';
var FULL_PATH = UPLOADS_DIR;
var APP_NAME = "MyPic"
var pageData = {
    pages: [data],
    currentPage: 0
}

var galleryData = pageData;

class Toolbar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<div className="toolbar">
            <img className="Logo" src="img/logo.png"></img>
        </div>)
    }
}

class Image extends React.Component {
    constructor(props) {
        super(props);
        this.image = "loading.jpg";
        this.loadImage.bind(this);
        this.state = {loaded: false}
        
    }

    loadImage() {
        console.log("loading" + this.props.src);
        let img = new Image();
        img.onload = () => {
            console.log('load complete');
            this.image = this.props.src;
            console.log("Loaded");
            this.setState({loaded: true});
        }
        img.onerror = (e) => {
            console.log(e);
        }
        img.src = THUMB_PATH + this.props.src;
        console.log(img.src);
        console.log(this.image);
        
    }

    render() {
        
        return (
            <img src={THUMB_PATH + this.props.src} />
        )
    
        
    }

    
}

class Gallery extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const images = pageData.pages[pageData.currentPage].items.map((val, i) => 
            <Image key={i} src={val.image} />
        );
        return (<div className="gallery-container">{images}</div>)
    }
}openForm

class FloatingActionBar extends React.Component{
   
    constructor(props) {
        super(props);
    }
    render() {
        return (<div id="fab" className="fab" onClick={openForm}>
            <p className="fabLogo">+</p>
        </div>)
    }
}

class UploadForm extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        return (<form id="uploadForm" className="hidden" method="post" encType="multipart/form-data" action="/addImage" >
            <input type="file" name="imgUpload" id="imgUpload" />
            <input type="text" name="tags" id="tags" />
            <button type="submit">Upload</button>
    </form>)    
}
}


class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Toolbar />
                <Gallery />
                <FloatingActionBar />
                <UploadForm />
            </div>
        )
    }
}

ReactDOM.render(<App galleryData={data}/>, document.getElementById('app')); 

