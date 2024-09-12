import React from 'react'

const page = ({
    params,
}: {
    params: { participantId: string };
}) => {
    return (
        <div>
            Detail of team {
                params.participantId
            }
        </div>
    )
}

export default page
