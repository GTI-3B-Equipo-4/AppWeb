let vueApp = new Vue({
    el: "#app",
    data: {
        // ros connection
        ros: null,
        rosbridge_address: 'ws://127.0.0.1:9090/',
        connected: false,
        port:'9090',
        interval:null,
        loading:false,
        logs:[],
        // page content
        menu_title: 'Connection',
        main_title: 'Main title, from Vue!!',
    },
   methods: {
        setCamera: function() {
            console.log('Setting the camera');
            let Viewer1 = new MJPEGCANVAS.Viewer({
                divID: 'divCamera',
                host: '127.0.0.1:8080',
                width: 320,
                height: 240,
                topic: '/turtlebot3/camera/image_raw',
                ssl: false
            })
            
        }, 
        connect: function() {
            this.loading = true
            // define ROSBridge connection object
            this.ros = new ROSLIB.Ros({
                url: this.rosbridge_address
            })

            // define callbacks
            this.ros.on('connection', () => {
                this.logs.unshift((new Date()).toTimeString() + '- Connected!')
                this.connected = true
                this.loading = false
                this.setCamera()

                console.log('Connection to ROSBridge established!')
            })
            this.ros.on('error', (error) => {

                this.logs.unshift((new Date()).toTimeString() + `- Error: ${error}`)
                console.log('Something went wrong when trying to connect')
                console.log(error)
            })
            this.ros.on('close', () => {
                this.logs.unshift((new Date()).toTimeString() + '- Disconnected!')
                this.connected = false
                this.loading = false
                document.getElementById('divCamera').innerHTML = ''
                console.log('Connection to ROSBridge was closed!')
            })
        },
		disconnect: function() {
            this.ros.close()
        },
    }, 
    mounted() {
        // page is ready
        console.log('page is ready!')
    },
})