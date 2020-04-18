// .....................................................................
// Autor: Matthew Conde Oltra
// Fecha inicio: 17/04/2020
// Última actualización: 17/04/2020
// machine_state.js
// .....................................................................

let vueApp = new Vue({
    el: "#app",
    data: {
        // ros connection
        ros: null,
        rosbridge_address: 'ws://127.0.0.1:9090/',
        connected: false,
        // Subscriber data
        position: {x: 0, y:0, z:0},
        // page content
        menu_title: 'Connection',
        main_title: 'Main title, from Vue!!',
        loading: false,
        service_busy: false,
        param_val: 0,
        level_battery: 100,
        param_read_val: 0,
        service_response: '',
    },
   methods: {
        connect: function() {
            // define ROSBridge connection object
            this.ros = new ROSLIB.Ros({
                url: this.rosbridge_address
            })
            // define callbacks
            this.ros.on('connection', () => {
                this.connected = true
                console.log('Connection to ROSBridge established!')
                let topic = new ROSLIB.Topic({
                    ros: this.ros,
                    name: '/odom',
                    messageType: 'nav_msgs/Odometry'
                })
                topic.subscribe((message)=> {
                    this.position = message.pose.pose.position
                    console.log(message)
                })
            })
            this.ros.on('error', (error) => {
                console.log('Something went wrong when trying to connect')
                console.log(error)
            })
            this.ros.on('close', () => {
                this.connected = false
                console.log('Connection to ROSBridge was closed!')
            })
        },
		disconnect: function() {
            this.ros.close()
        },
		sendCommand: function(){
			let topic = new ROSLIB.Topic({
				ros: this.ros,
				name: '/cmd_vel',
				messageType:'geometry_msgs/Twist'
			})
			let message = new ROSLIB.Message({
				linear: {x: 1, y: 0, z: 0, },
				angular: {x: 0, y:0, z: 0.5, },
			})
			topic.publish(message)
		},
		sendTurnRigth: function(){
			let topic = new ROSLIB.Topic({
				ros: this.ros,
				name: '/cmd_vel',
				messageType:'geometry_msgs/Twist'
			})
			let message = new ROSLIB.Message({
				linear: {x: -1, y: 0, z: 0, },
				angular: {x: 0, y:0, z: 0.5, },
			})
			topic.publish(message)
		},
		sendStop: function(){
			let topic = new ROSLIB.Topic({
				ros: this.ros,
				name: '/cmd_vel',
				messageType:'geometry_msgs/Twist'
			})
			let message = new ROSLIB.Message({
				linear: {x: 0, y: 0, z: 0, },
				angular: {x: 0, y:0, z: 0, },
			})
			topic.publish(message)
        },
        set_param: function(value){
		    //set service busy
		    service_busy = true
		    let web_param = new ROSLIB.Param({
		        ros: this.ros,
		        name: 'web_param'
            })
            //if you need collect from the web
            //web_param.set(this.param_val)
            //web_param.set(value)
            this.param_val = value
            console.log(value)
		    service_busy = false
		    console.log('Reading param')
        },
        set_battery: function(value){
		    //set service busy
		    service_busy = true
		    let web_param = new ROSLIB.Param({
		        ros: this.ros,
		        name: 'web_param'
            })
            //if you need collect from the web
            //web_param.set(this.param_val)
            //web_param.set(value)
            this.level_battery = value
            console.log(value)
		    service_busy = false
		    console.log('Reading param')
        },
        callMachineState: function(){
            this.service_busy = true
            this.service_response = ''
            //define the service to call
            let service = new ROSLIB.Service({
                ros: this.ros,
                name: '/machine_state',
                serviceType: 'dream_team_msgs/DreamTeamServiceMessage'
            })
            //define the request
            let request = new ROSLIB.ServiceRequest({
                on: this.param_val,
                battery: this.level_battery,
            })
            //define a callback
            service.callService(request, (result) => {
                this.service_busy = false
                this.service_response = JSON.stringify(result.success)
                //console.log(this.service_response)
            }, (error) => {
                this.service_busy = false
                if(error){
                    console.log(error)
                }
            })
            
        }
    }, 
    mounted() {
        // page is ready
        console.log('page is ready!')
    },
})