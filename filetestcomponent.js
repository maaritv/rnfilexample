import React from 'react'
import { useState, useEffect } from 'react'
import { View, Text, Image } from 'react-native'
import { readTextFile, writeTextFile } from './services/fileservice'
import { FileProtectionKeys } from 'react-native-fs'

export const FileTestComponent = ({image}) => {
    const [fileContent, setFileContent] = useState('')
    const [filePath, setFilePath] = useState('')
    const [message, setMessage] = useState('')
    const [data, setData] = useState('')
    const [imageuri, setImageUri] = useState(null)

    const fileName = 'mydata.txt'
    const imageFileName='myimage.txt'

    /**
     * When component is mounted, it first saves data and reads it.
     * When it is read, it is displayed too.
     * It also saves the image data (in uri format)
     * and reads the image to demonstrate both reading and writing
     * when setData and setImageUri functions are called, component is 
     * rendered.
     */

    useEffect(() => {
        async function readAndWrite() {
            await createTestFile()
            await readTestFile()
            await createImageFile(image)
            await readImageFile()
        }
        readAndWrite()
    }, [])

/**
 * use async and await to wait until asynchronous fileoperation is done.
 * if it fails, error is caught and message is provided to user.
 */

    async function createTestFile() {
        try {
            const data = 'dataa ' + (new Date())
            const path = await writeTextFile(data, fileName)
            setFilePath(path)
            setMessage(`file is stored to ${path}`)
        }
        catch (e) {
           setMessage(`error when storing the file ${e.message}`)
        }
    }

    async function readTestFile() {
        try {
            const data = await readTextFile(fileName)
            setData(data)
            setMessage(`file ${fileName} is read`)
        }
        catch (e) {
            setMessage(`error when reading the file ${e.message}`)
        }
    }

    async function createImageFile(data) {
        try {
            const path = await writeTextFile(data, imageFileName)
            setImageFilePath(path)
            setMessage(`image is stored to ${path}`)
        }
        catch (e) {
           setMessage(`error when storing the image file ${e.message}`)
        }
    }

    async function readImageFile() {
        try {
            const data = await readTextFile(imageFileName)
            setImageUri(data)
            setMessage(`file ${fileName} is read`)
        }
        catch (e) {
            setMessage(`error when reading the image file ${e.message}`)
        }
    }


    return (<View style={container}>
        <View style={messageStyle}><Text>{message}</Text></View>
        <View style={middleStyle}><Text>{data}</Text></View>
        <View style={imageStyle}><Image style={{width: 100, height: 100}} source={{uri: imageuri}}/></View>
    </View>)
}

const container = {
   flex: 1,
   backgroundColor: 'lightblue',
}

const messageStyle= {
    flex: 1
}

const middleStyle= {
    flex: 2
}
const imageStyle= {
    flex: 15
}
