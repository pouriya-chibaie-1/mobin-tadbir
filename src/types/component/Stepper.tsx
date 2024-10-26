import React from "react";

export interface StepperInterface extends React.HTMLAttributes<HTMLDivElement>
{
    items: string[];
    activeStep?: number;
}
