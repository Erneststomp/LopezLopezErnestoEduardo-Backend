module.exports = {
    apps: [
        {
            name: 'forked',
            script: 'src/app.js',
            watch: true,  
            autorestart: true,
            env: {
                PORT: 8082
            }  
        },
        {
            name: 'clustered',
            script: 'src/app.js',
            watch: true,
            autorestart: true,
            env: {
                PORT: 8080
            },
            exec_mode:'cluster',
            instances: '2',        
            node_args: "--harmony",          
        },
    ]
};
