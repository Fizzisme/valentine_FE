'use client';

import * as React from 'react';
import { Panda } from 'lucide-react';

import { Dialog, DialogTrigger } from '@/components/animate-ui/components/radix/dialog';

import { HeartLoginDialog } from '@/components/PandaDialog/HeartLoginDialog/HeartLoginDialog';

export function PandaDialog() {
    return (
        <Dialog>
            {/* 👉 CLICK PANDA */}
            <DialogTrigger asChild>
                    <Panda />
            </DialogTrigger>

            {/* 👉 DIALOG */}
            <HeartLoginDialog />
        </Dialog>
    );
}
