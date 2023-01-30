
import { useState } from 'react'
import * as ops from '../util/operations'
import * as render from '../util/render'
import styles from './Editor.module.css'

const value = (e) => e.target.value

export const Linebreak = () => <div className={styles.linebreak}/>

export const Editor = () => {
    const [character, _editCharacter] = useState(ops.defaultCharacter())
    const editCharacter = (f) => (e) => _editCharacter((character) => f(character, value(e)))

    const ltmlBlob = new Blob([JSON.stringify(character)], { type: "text/json" });
    const ltmlURL = URL.createObjectURL(ltmlBlob);

    const jsonBlob = new Blob([render.toPygmalionJSON(character)], { type: "text/json" });
    const jsonURL = URL.createObjectURL(jsonBlob);

    const onFileChange = event => {
        var reader = new FileReader();
        reader.onload = function(event) {
            _editCharacter(JSON.parse(event.target.result)); 
        };
        reader.readAsText(event.target.files[0]);
    }

    return (
        <div className={styles.form}>
            <div className={styles.header}> Lion Tamer </div>
            <div className={styles.paragraph}>
                Lion Tamer is a visual character definition editor for usage with Pygmalion. It uses the W++
                format under the hood. It was built with the intent of giving users of W++ a more convenient
                way of editting W++, as well as giving users of Pygmalion a way to edit their characters when
                Google Collab servers are not available for them to use.
            </div>
            <div className={styles.paragraph}>
                Lion Tamer uses its own custom JSON file format to store character definitions in a more
                structured way. To save a character so that it can be loaded into Lion Tamer, click
                Export To LTML. To save a character such that it can be loaded into Pygmalion, click
                Export to JSON. The custom format was selected due for convenience and extensibility.
                Loading in a character that was not built in Lion Tamer is currently not supported.
            </div>
            <Linebreak />
            <div className={styles.spacer} />
            <div className={styles.buttonRow}>
                <div>
                    <span className={styles.importText}> Import from LTML </span>
                    <input type="file" onChange={onFileChange} accept="text/json"/>
                </div>
                <div>
                    <a type="button" href={jsonURL} download={`${character.name}.pygmalion.json`}>
                        Export To JSON
                    </a>

                    <a type="button" href={ltmlURL} download={`${character.name}.ltml.json`}>
                        Export To LTML
                    </a>
                </div>
            </div>
            <Linebreak />
            <div className={styles.input}>
                <label>     
                    <div className={styles.label}>Name</div>
                    <input className={styles.input} type="text" value={character.name} onChange={editCharacter(ops.editName)} />
                </label>
            </div>

            <div className={styles.input}>
                <label>     
                    <div className={styles.label}>Scenario</div>
                    <textarea className={styles.textarea} value={character.scenario} onChange={editCharacter(ops.editScenario)} />
                </label>
            </div>

            <div className={styles.input}>
                <label>     
                    <div className={styles.label}>Greeting</div >
                    <textarea className={styles.textarea} value={character.greeting} onChange={editCharacter(ops.editGreeting)} />
                </label>
            </div>
            <Linebreak />
            <div className={styles.section}>
                <div className={styles.sectionHeader}>
                    <div className={styles.subheader}>Traits</div>
                    <div className={styles.sectionHeaderBox}>
                        <div className={styles.sectionHeaderLabel}>New Trait</div>
                        <input className={styles.sectionHeaderSubmit} type="button" value="+" onClick={() => {
                            _editCharacter((character) => ops.addTrait(character,))
                        }}/>
                    </div>
                </div>
                { Object.keys(character.traits).length > 0 && <Linebreak /> }
                <div className={styles.sectionList}>
                    {
                        Object.keys(character.traits).map((trait, n) => {
                            return (<div className={styles.emptyLabel} key={`trait-section-${n}`}>
                                <label>     
                                    <div className={styles.sectionHeader}>
                                        <input className={styles.input} type="text" value={trait} onChange={editCharacter(
                                            (character, newTrait) => {
                                                return ops.editTrait(character, trait, newTrait)
                                            }
                                        )}/>
                                        <div className={styles.sectionHeaderBox}>
                                            <input className={styles.sectionHeaderSubmit} type="button" value="+" onClick={() => {
                                                _editCharacter((character) => ops.addTraitNode(character, trait))
                                            }}/>
                                        </div>
                                    </div>
                                    
                                </label>
                                <div className={styles.section}>
                                    {character.traits[trait].length > 0 && (<>
                                        {character.traits[trait].map((entry, m) => {
                                            return (<div className={styles.removableInput} key={`trait-section-${n}-${m}`}>
                                                <input className={styles.input} value={character.traits[trait][m]} onChange={editCharacter(
                                                    (character, value) => ops.editTraitNode(character, trait, m, value)
                                                )} />
                                                <input className={styles.removeButton} type="button" value="-" onClick={() => {
                                                _editCharacter((character) => ops.deleteTraitNode(character, trait, m))
                                                }}/>
                                            </div>)
                                        })}
                                    </>)}
                                </div>
                                <div className={styles.buttonRow}>
                                    <input type="button" value="Remove List" onClick={() => {
                                        const response = window.confirm(`Delete trait list for ${trait}?`)
                                        if(response) _editCharacter((character) => ops.deleteTrait(character, trait))
                                    }}/>
                                    <input type="button" value="Copy List" onClick={() => {
                                        _editCharacter((character) => ops.copyTrait(character, trait, `${trait}-copy`))
                                    }}/>
                                </div>
                                {n !== (Object.keys(character.traits)).length - 1 && <Linebreak />}
                            </div>)
                        })
                    }
                </div>
            </div>

            <Linebreak />
            <div className={styles.section}>
                <div className={styles.sectionHeader}>
                    <div className={styles.subheader}>Dialogues</div>
                    <div className={styles.sectionHeaderBox}>
                        <div className={styles.sectionHeaderLabel}>New Dialogue</div>
                        <input className={styles.sectionHeaderSubmit} type="button" value="+" onClick={() => {
                            _editCharacter((character) => ops.addDialogue(character))
                        }}/>
                    </div>
                </div>
                { character.dialogues.length > 0 && <Linebreak /> }
                <div className={styles.sectionList}>
                    {
                        character.dialogues.map((_, n) => {
                            return (<div key={`dialogue-section-${n}`}>
                                <div className={styles.section}>
                                    <div className={styles.sectionHeader}>
                                        <div>Dialogue {n}</div>
                                        <div className={styles.sectionHeaderBox}>
                                            <div className={styles.sectionHeaderLabel}>New Message</div>
                                            <input className={styles.sectionHeaderSubmit} type="button" value="+" onClick={() => {
                                                _editCharacter((character) => ops.addDialogueNode(character, n))
                                            }}/>
                                        </div>
                                    </div>
                                    <div className={styles.dialogueSection}>
                                        {
                                            character.dialogues[n].map((text, m) => {
                                                return (<div className={styles.removableInput} key={`dialogue-section-${n}-${m}`}>
                                                    <textarea className={styles.textarea} value={character.dialogues[n][m]} onChange={editCharacter(
                                                        (character, value) => ops.editDialogueNode(character, n, m, value)
                                                    )} />
                                                    <input className={styles.removeButton} type="button" value="-" onClick={() => {
                                                       _editCharacter((character) => ops.deleteDialogueNode(character, n, m))
                                                    }}/>
                                                </div>)
                                            })
                                        }
                                    </div>
                                </div>
                                <input type="button" value="Remove List" onClick={() => {
                                    const response = window.confirm(`Delete conversation ${n}?`)
                                    if(response) _editCharacter((character) => ops.deleteDialogue(character, n))
                                }}/>
                                {n !== (Object.keys(character.dialogues)).length - 1 && <Linebreak />}
                            </div>)
                        })
                    }
                </div>
            </div>
        </div>
    ) 
}