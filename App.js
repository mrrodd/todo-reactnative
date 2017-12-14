import React from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import Note from "./app/components/Note";

export default class App extends React.Component {

    state = {
        noteArray: [
            {date: '12/11/2017', note:'testnote 1'}, 
            {date: '12/13/2017', note:'testnote 2'}
        ],
        noteText: ''
    }

    render() {

        let notes = this.state.noteArray.map((val, key) => {
            return <Note key={key} keyval={key} val={val} deleteMethod={() => this.deleteNote(key)} />
        });

        return (            
            <View style={styles.container}>

                <View style={styles.header}>
                    <Text style={styles.headerText}>- ToDo List -</Text>
                </View>

                <ScrollView style={styles.scrollContainer}>
                    {notes}
                </ScrollView>
                
                <View style={styles.footer}>
                    <TouchableOpacity onPress={this.addNote.bind(this)} style={styles.addButton}>
                        <Text style={styles.addButtonText}>+</Text>
                    </TouchableOpacity>

                    <TextInput style={styles.textInput} 
                        onChangeText={(noteText) => this.setState({noteText})} value={this.state.noteText}
                        placeholder='Add tasks...'
                        placeholderTextColor='white' underlineColorAndroid='transparent'>
                    </TextInput>
                </View>
            </View>
        );
    }

    addNote() {
        if(this.state.noteText) {
            let d = new Date();
            let currDate = (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear();
            this.state.noteArray.push( {'date': currDate, 'note': this.state.noteText} );
            this.setState({noteArray: this.state.noteArray});
            this.setState({noteText: ''});
        }
    }

    deleteNote(key) {
        this.state.noteArray.splice(key, 1);
        this.setState({noteArray: this.state.noteArray});
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: '#E91E63',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 10,
        borderBottomColor: '#ddd',
    },
    headerText: {
        color: 'white',
        fontSize: 18,
        padding: 26,
    },
    scrollContainer: {
        flex: 1,
        marginBottom: 100,
    },
    footer: {
        position: 'absolute',
        alignItems: 'center',
        bottom: 0,
        left: 0,
        right: 0,
    },
    addButton: {
        backgroundColor: '#E91E63',
        width: 90,
        height: 90,
        borderRadius: 50,
        borderColor: '#ccc',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
        marginBottom: -45,
        zIndex: 10,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 24,
    },
    textInput: {
        alignSelf: 'stretch',
        color: '#fff',
        padding: 20,
        paddingTop: 46,
        backgroundColor: '#252525',
        borderTopWidth: 2,
        borderTopColor: '#ededed',
    },    
});