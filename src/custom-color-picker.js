import React, { useEffect, useState } from 'react';
import { CustomPicker } from 'react-color';

const tinycolor = require("tinycolor2");
const { Saturation, EditableInput, Hue } = require('react-color/lib/components/common');

const inputStyles = {
    input: {
        border: 'none',
    },
    label: {
        fontSize: '12px',
        color: '#999',
    },
};
const inlineStyles = {
    container: {
        boxShadow: 'rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px',
        display: 'flex',
        flexDirection: 'column',
        height: 250,
        width: 200,
        padding: '10px',
        backgroundColor: '#f5f5f5'
    },
    pointer: {
        width: '18px',
        height: '18px',
        borderRadius: '50%',
        transform: 'translate(-9px, -1px)',
        backgroundColor: 'rgb(248, 248, 248)',
        boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.37)',
    },
    slider: {
        marginTop: '1px',
        width: '4px',
        borderRadius: '1px',
        height: '8px',
        boxShadow: '0 0 2px rgba(0, 0, 0, .6)',
        background: '#fff',
        transform: 'translateX(-2px)'
    },
    saturation: {
        width: '100%',
        paddingBottom: '75%',
        position: 'relative',
        overflow: 'hidden',
    },
    swatchSquare: {
        minWidth: 20,
        minHeight: 20,
        margin: '1px 2px',
        cursor: 'pointer',
        boxShadow: '0 0 2px rgba(0, 0, 0, .6)',
    }
}

const CustomSlider = () => {
    return (
        <div style={inlineStyles.slider} />
    )
}

const CustomPointer = () => {
    return (
        <div style={inlineStyles.pointer} />
    )
}

const CustomColorPicker = (props) => {

    const [hsl, setHsl] = useState({
        h: 0,
        s: 0,
        l: 0
    })

    const [hsv, setHsv] = useState({
        h: 0,
        s: 0,
        v: 0
    })

    const [, setHex] = useState('aaaaaa');

    useEffect(() => {
        const color = tinycolor(props.hexCode);
        setHsl(color.toHsl());
        setHsv(color.toHsv());
        setHex(color.toHex());
    }, [props.hexCode])


    const handleHueChange = hue => {
        setHsl(hue);
    }

    const handleSaturationChange = hsv => {
        const color = tinycolor(hsv);
        props.onChange(color.toHex())
    }

    const displayColorSwatches = colors => {
        return colors.map(color => {
            return (
                <div
                    onClick={() => props.onChange(color.color)}
                    key={color.color}
                    style={{ ...inlineStyles.swatchSquare, backgroundColor: color.color, }}
                />
            );
        })
    }

    return (
        <div style={inlineStyles.container}>
            <span style={{ textAlign: 'center' }}>{props.heading}</span>
            <div style={inlineStyles.saturation}>
                <Saturation
                    hsl={hsl}
                    hsv={hsv}
                    pointer={CustomPointer}
                    onChange={(hsv) => handleSaturationChange(hsv)}
                />
            </div>
            <div style={{ minHeight: 10, position: 'relative', margin: 2 }}>
                <Hue
                    hsl={hsl}
                    pointer={CustomSlider}
                    onChange={(hue) => handleHueChange(hue)}
                    direction={'horizontal'}
                />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', margin: '2px 0', padding: 5 }}>
                <span style={{ color: 'gray', fontSize: 13, marginRight: 3, marginTop: 2, marginLeft: 3 }}>Hex</span>
                <EditableInput
                    style={inputStyles}
                    value={props.hexCode}
                    onChange={props.onChange} />
            </div>
            {props.colors.length &&
                <div style={{ display: 'flex', width: '100%', flexWrap: 'wrap', padding: 3 }}>
                    {displayColorSwatches(props.colors)}
                </div>
            }
        </div>
    );

}

export default CustomPicker(CustomColorPicker);