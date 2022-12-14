import server from './server'

// import path from 'path'
// const filePath = path.resolve(__dirname, 'public/matrix.csv')

// Constants
const serverStartMsg = 'Express server started on port: '
const port = process.env.PORT || 3000

//Start server
server.listen(port, () => {
	console.info(serverStartMsg + port)
})
