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
                width: 800,
                height: 450,
                topic: '/turtlebot3/camera/image_raw',
                ssl: false,
            })
            
        },
        girarIzquierda: function() {
            let topic = new ROSLIB.Topic({
            ros: this.ros,
            name: '/cmd_vel',
            messageType: 'geometry_msgs/Twist'
            })
        
            let message = new ROSLIB.Message({
            linear: {x: 0,y: 0, z:0},
            angular: {x: 0,y: 0, z: 0.5},
            })
        
            topic.publish(message)
        }
        ,girarDerecha: function(){
            let topic = new ROSLIB.Topic({
            ros: this.ros,
            name: '/cmd_vel',
            messageType: 'geometry_msgs/Twist'
            })
            let message = new ROSLIB.Message({
            linear: {x:0, y:0, z:0},
            angular: {x:0, y:0, z:-0.5},
            })
            topic.publish(message)
        },
        moverHaciaDelante: function(){
            let topic = new ROSLIB.Topic({
            ros: this.ros,
            name: '/cmd_vel',
            messageType: 'geometry_msgs/Twist'
            })
            let message = new ROSLIB.Message({
            linear: {x:0.5, y:0, z:0},
            angular: {x:0, y:0, z:0},
            })
            topic.publish(message)
        },
        Stop: function(){
            let topic = new ROSLIB.Topic({
            ros: this.ros,
            name: '/cmd_vel',
            messageType: 'geometry_msgs/Twist'
            })
            let message = new ROSLIB.Message({
            linear: {x:0, y:0, z:0},
            angular: {x:0, y:0, z:0},
            })
            topic.publish(message)
        },
        moverHaciaAtras: function(){
            let topic = new ROSLIB.Topic({
            ros: this.ros,
            name: '/cmd_vel',
            messageType: 'geometry_msgs/Twist'
            })
            let message = new ROSLIB.Message({
            linear: {x:-0.5, y:0, z:0},
            angular: {x:0, y:0, z:0},
            })
            topic.publish(message)
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
        this.connect()
        console.log('page is ready!')
    },
})