// .....................................................................
// Autor: Matthew Conde Oltra
// Fecha inicio: 17/04/2020
// Última actualización: 17/04/2020
// main.js
// .....................................................................
let vueApp = new Vue({
    el: "#app",
    data: {
        // ros connection
        ros: null,
        rosbridge_address: 'ws://127.0.0.1:9090/',
        connected: false,
        port:'9090',
        mapViewer:null,
        mapGridClient:null,
        interval:null,
        loading:false,
        logs:[],
        // page content
        menu_title: 'Connection',
        main_title: 'Main title, from Vue!!',
    },
   methods: {
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

                this.mapViewer = new ROS2D.Viewer({
                    divID:'map',
                    width:420,
                    height:360
                })

                this.mapGridClient = new ROS2D.OccupancyGridClient({
                    ros: this.ros,
                    rootObject: this.mapViewer.scene,
                    continuous:true
                })

                this.mapGridClient.on('change',()=>{
                    
                    this.mapViewer.scaleToDimensions(this.mapGridClient.currentGrid.width,this.mapGridClient.currentGrid.height);
                    this.mapViewer.shift(this.mapGridClient.currentGrid.pose.position.x,this.mapGridClient.currentGrid.pose.position.y)
                })
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
                document.getElementById('map').innerHTML = ''
                console.log('Connection to ROSBridge was closed!')
            })
        },
		disconnect: function() {
            this.ros.close()
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