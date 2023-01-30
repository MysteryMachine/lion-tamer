export const defaultCharacter = () => {
    return {
        name: "",
        scenario: "",
        greeting: "",
        dialogues: [],
        traits: {}
    }
}

export const addDialogue = (character) => {
    return {
        ...character,
        dialogues: [
            ...character.dialogues,
            []
        ]
    }
}

export const deleteDialogue = (character, dialogueIndex) => {
    const newDialogues = [ ...character.dialogues ]
    newDialogues.splice(dialogueIndex, 1)

    return {
        ...character,
        dialogues: newDialogues
    }
}


export const addDialogueNode = (character, dialogueIndex, message = "") => {
    const newDialogues = [ ...character.dialogues ]
    const existingDialogueList = [ ...newDialogues[dialogueIndex] ]

    newDialogues[dialogueIndex] = [...existingDialogueList, message]

    return {
        ...character,
        dialogues: newDialogues
    }
}

export const editDialogueNode = (character, dialogueIndex, messageIndex, message) => {
    const newDialogues = [ ...character.dialogues ]
    const newDialogueList = [ ...newDialogues[dialogueIndex] ]
    newDialogueList[messageIndex] = message

    newDialogues[dialogueIndex] = newDialogueList

    return {
        ...character,
        dialogues: newDialogues
    }
}

export const deleteDialogueNode = (character, dialogueIndex, messageIndex, numToSplice = 1) => {
    const newDialogues = [ ...character.dialogues ]
    const newDialogueList = [ ...newDialogues[dialogueIndex] ]
    newDialogueList.splice(messageIndex, numToSplice)

    newDialogues[dialogueIndex] = newDialogueList

    return {
        ...character,
        dialogues: newDialogues
    }        
}

export const addTrait = (character, trait = "") => {
    return {
        ...character,
        traits: {
            ...character.traits,
            [trait]: []
        }
    }
}

export const copyTrait = (character, oldTrait, newTrait) => {
    return {
        ...character,
        traits: {
            ...character.traits,
            [newTrait]: [...character.traits[oldTrait]]
        }
    }
}

export const deleteTrait = (character, trait) => {
    const newTraits = { ...character.traits }
    delete newTraits[trait]

    return {
        ...character,
        traits: newTraits
    }
}

export const editTrait = (character, oldTrait, newTrait) => {
    const newTraits = { ...character.traits }
    newTraits[newTrait] = newTraits[oldTrait]
    delete newTraits[oldTrait]

    return {
        ...character,
        traits: newTraits
    }
}

export const addTraitNode = (character, trait, value = "") => {
    return {
        ...character,
        traits: { 
            ...character.traits, 
            [trait]: [ ...character.traits[trait], value ] 
        }
    }
}

export const editTraitNode = (character, trait, traitIndex, value) => {
    const newTraitList = [ ...character.traits[trait] ]
    newTraitList[traitIndex] = value

    return {
        ...character,
        traits: { 
            ...character.traits, 
            [trait]: newTraitList
        }
    }
}

export const deleteTraitNode = (character, trait, traitIndex) => {
    const newTraitList = [ ...character.traits[trait] ]
    newTraitList.splice(traitIndex, 1)

    return {
        ...character,
        traits: { 
            ...character.traits, 
            [trait]: newTraitList
        }
    }
}

export const editName = (character, newName) => ({ ...character, name: newName })

export const editScenario = (character, newScenario) => ({ ...character, scenario: newScenario })

export const editGreeting = (character, newGreeting) => ({ ...character, greeting: newGreeting })