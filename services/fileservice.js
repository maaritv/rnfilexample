var RNFS = require('react-native-fs');


/**
 * Saves text data to user folder of iOS app. 
 * saves text data to app folder in Android.
 * RECHECK THIS FROM REACT-NATIVE-FS DOCUMENTATION 
 * BEFORE USING THIS CODE.
 * 
 * Throws error, if writing the file fails.
 * returns path to file
 * 
 * @param {} content 
 * @param {*} filePath 
 */

export async function writeTextFile(content, filename) {
    var path = `${RNFS.DocumentDirectoryPath}/${filename}`
    console.log("polku on "+path)
    await RNFS.writeFile(path, content, 'utf8')
    return path
}

export async function readTextFile(fileName){
    const folder=RNFS.DocumentDirectoryPath
    return await RNFS.readFile(`${folder}/${fileName}`)
}
