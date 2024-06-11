import { useParams, useSearchParams } from 'react-router-dom';
import React from 'react';

export default function CustomParams(Comp) {
    return props => {
        const [searchParams] = useSearchParams();
        const status = searchParams.get('status');
        const params = useParams();
        return <Comp {...props} params={{ ...params, status }} />;
    };
}
