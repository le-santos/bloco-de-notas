/* TO DO

1) Tornar lista lateral em links que destacam a nota 

2) Melhorar o Layout CSS geral

3) Melhorar o gerador de ID das notas
5) Evitar as variaveis globais

*/


const botaoCriar = document.getElementById('criar')
const noteArea = document.getElementById('note-area')
const listaGeral = document.getElementById('lista-geral')
const noteTitle = document.getElementById('title')
const noteContent = document.getElementById('content')

const confirmDel = document.getElementById('confirm-del')
const cancelDel = document.getElementById('cancel-del')

const noteList = []

// Function - Mostrar lista de notas
const showNoteList = function(){
	
	listaGeral.innerHTML = "";

  for (let i = 0; i < noteList.length; i++) {
      let parag = document.createElement('P')
      parag.setAttribute('class', 'note-list')
			parag.innerText = noteList[i].title
			listaGeral.appendChild(parag)
	}
}

showNoteList()

// Function - Mostrar DIV criador de novas notas, adicionando nova class a ClassList do elemento

const showBlock = () => {
	//limpa as variaveis
  noteTitle.value = 'Título'   
  noteContent.value = ''

  document.getElementById('note-creator').classList.add('box-transition')  
}

const novaNota = document.getElementById('show-block')
novaNota.addEventListener('click', showBlock)


// Function - Cancelar a criacao de nota, removendo a class da ClassList

const cancelNote = () => {

  document.getElementById('note-creator').classList.remove('box-transition')
  //limpa as variaveis
  noteTitle.value = 'Título'   
  noteContent.value = ''
}

const cancelButton = document.getElementById("cancelar")
cancelButton.addEventListener("click",cancelNote)

/* 
Para Deletar a nota:
+ seleciona a nota, mostra a box de confirm, 
+ remove o elemento HTML, o objeto na array NoteList e o nome na lista lateral
*/

var noteId
var noteParent
var choice

const selectNote = () => {
	noteId = event.target.parentElement.getAttribute("data-id")
	noteParent = event.target.parentElement
	console.log(noteId)	
	console.log(noteParent)
	document.getElementById('cancel-confirm').classList.add('box-transition')
	
}

const removeNote = function() {
	
	choice = event.target.id
	console.log(choice)
	console.log(event.target.parentElement)

	if (choice === "confirm-del") {
		for (let i = 0; i < noteList.length; i++){
			if(noteList[i].id === parseInt(noteId)){
				noteList.splice(i, 1)
				noteParent.remove()
				showNoteList()
			}
		}
	} 
	
	document.getElementById("cancel-confirm").classList.remove('box-transition')
	noteId = ''
	choice = ''
	noteParent = ''
	return
}

const noteDel = document.querySelector('.delete')
noteDel.addEventListener('click', selectNote);

confirmDel.addEventListener("click", removeNote)
cancelDel.addEventListener("click", removeNote)


// MAIN FUNCTION: cria um elemento gerando novo bloco de nota

const criaNota = function() {

	let nota = {id: '', title: '', content: ''}

  //cria elementos e set the classes attributes
  let div1 = document.createElement('DIV')
  let delBut = document.createElement('BUTTON')
  let div2 = document.createElement('DIV')
  let div3 = document.createElement('DIV')
  
	
  div1.setAttribute('class', 'note')
  delBut.setAttribute('class', 'delete')
  div2.setAttribute('class', 'note-title')
  div3.setAttribute('class', 'note-content')
  

  //Copia aos elementos o texto (VALUE) dos inputs
  div2.innerText = noteTitle.value
  delBut.innerText = 'X'
  div3.innerText = noteContent.value
	
	//Coloca os dados no Objeto nota e na Array noteList
	nota.id = Math.round( 100000 * Math.random() ); 
	nota.title = noteTitle.value
	nota.content = noteContent.value
	div1.setAttribute('data-id', nota.id)
	
	noteList.push(nota)

	//adiciona function de delete ao botao
	delBut.addEventListener('click', selectNote);
	
	// append os elementos
  noteArea.appendChild(div1)
  div1.appendChild(div2)
  div1.appendChild(delBut)
  div1.appendChild(div3)

  //esconde o note creator
	document.getElementById('note-creator').classList.remove('box-transition')
	
	//atualiza lista das notas 
	showNoteList()

}

botaoCriar.addEventListener("click", criaNota)



