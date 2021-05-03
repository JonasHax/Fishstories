import React from 'react'
import { BottomBar } from './BottomBar';
import  './CatchReportView.css';
import { TopBar } from './TopBar';

export const CatchReportView = (props) => {
    return (
        <div className="Container">
            <TopBar className="TopBar"
                location="Hvidesande Fiskepark"
            ></TopBar>
            <BottomBar className="BottomBar"
                fishType={props.catchReport.fishType}
                weight={props.catchReport.weight}
                lenght={props.catchReport.length}
                description={props.catchReport.description}
            ></BottomBar>
        </div>
    )
}
