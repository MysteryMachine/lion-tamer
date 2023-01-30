export const jsonBase = () => {
    return {
        char_name: "",
        char_persona: "",
        world_scenario: "",
        char_greeting: "",
        example_dialogue: ""
    }
}

export const renderTraitList = (trait, traitList) =>
    `${trait}(${traitList.map((v) => `"${v}"`).join(' + ')})`

export const renderTraitRoots = (traits) =>
    Object.keys(traits).map((trait) => renderTraitList(trait, traits[trait])).join('\n    ')

export const renderTraits = (char) =>
    `[character(${char.name})\n{\n    ${renderTraitRoots(char.traits)}\n}]`

export const renderDialogueList = (dialogueList) =>
    `<START>\n${dialogueList.join('\n')}`

export const renderDialogues = (char) => char.dialogues.map(renderDialogueList).join('\n\n')

export const toObject = (char) => ({
    char_name: char.name,
    world_scenario: char.scenario,
    char_greeting: char.greeting,
    example_dialogue: renderDialogues(char),
    char_persona: renderTraits(char)
})

export const toPygmalionJSON = (char) => JSON.stringify(toObject(char))