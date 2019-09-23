import React, { useState } from 'react';
import ToggleButton from './ToggleButton';
import '../styles/components/ToggleButtonGroup.scss';

const ToggleButtonGroup = (props) => {

    const [ currentPoly, setCurrentPoly ] = useState(0);
    const [ playerOrder, setPlayerOrder ] = useState([]);
    const [ playerOverrides, setPlayerOverrides ] = useState([]);

    const handleUpdatePoly = (n, playerId) => {

        setCurrentPoly(currentPoly + n);

        if (n === 1 && (currentPoly < props.polyphony || props.polyphony === -1)) {
            setPlayerOrder(playerOrder.concat([playerId]));
        }

        else if (n === 1 && currentPoly === props.polyphony) {
            setPlayerOverrides(playerOverrides.concat(playerOrder[0]));
            setPlayerOrder(playerOrder.slice(1).concat([playerId]));
        }

        else if (n === -1) {
            setPlayerOrder(playerOrder.filter(p => p !== playerId));
        }

    }

    const handleUpdateOverrides = (playerId) => {

        setPlayerOverrides(playerOverrides.filter(p => p !== playerId));

    }

        return (
            <div className = 'toggle-button-group'>

                <h3>{props.name} ({currentPoly} / {
                    props.polyphony === -1 ? props.voices.length : props.polyphony
                })</h3>

                <div className = 'toggle-buttons'>

                    {props.voices.map((voice) => (
                        <ToggleButton
                            key = {voice.name}
                            name = {voice.name}
                            length = {voice.length}
                            quantizeLength = {voice.quantizeLength}
                            handleUpdatePoly = {handleUpdatePoly}
                            handleUpdateOverrides = {handleUpdateOverrides}
                            override = {playerOverrides.indexOf(voice.name) !== -1}
                        />
                    ))}

                </div>

            </div>
        );
}

export default ToggleButtonGroup;