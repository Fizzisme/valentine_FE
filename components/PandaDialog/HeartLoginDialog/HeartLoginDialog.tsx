'use client';

import { useState } from 'react';
import {
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/components/animate-ui/components/radix/dialog';

import { Button } from '@/components/animate-ui/components/buttons/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function HeartLoginDialog() {
    const CORRECT_BIRTHDAY = '09/09/2005';

    const [birthday, setBirthday] = useState('');

    const [unlocked, setUnlocked] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleCheckBirthday = () => {
        if (birthday === CORRECT_BIRTHDAY) {
            setUnlocked(true);
            setError('');
            setSuccess(true);
        } else {
            setError('Noooooooooooooooooooooooooooooo T_T');
        }
    };

    return (
        <DialogContent
            showCloseButton={false}
            className="
        fixed
        left-1/2 top-1/2
        -translate-x-1/2 -translate-y-1/2
         w-full
           bg-gradient-to-br from-rose-100 via-pink-100 to-rose-200
    "
            style={{ width: '300px', boxShadow: '0px 0px 5px 5px rgba(0,0,0,0.05)', color: '#E75480' }}
        >
            <DialogHeader>
                <DialogTitle>{success ? 'Your account' : ''}</DialogTitle>
                <DialogDescription>{success ? 'Use this to enter my heart.' : ''}</DialogDescription>
            </DialogHeader>

            {/* 🎂 STEP 1: BIRTHDAY */}
            {!unlocked && (
                <div
                    style={{
                        display: 'grid',
                        gap: '12px',
                        padding: '16px 0',
                    }}
                >
                    <Label htmlFor="birthday">Enter Fizz's birthday</Label>
                    <Input
                        style={{ color: '#E75480' }}
                        id="birthday"
                        placeholder="Ex: 13/06/2005"
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                    />
                    <Button
                        style={{ backgroundColor: 'lightpink' }}
                        className="cursor-pointer"
                        onClick={handleCheckBirthday}
                    >
                        Unlock
                    </Button>
                </div>
            )}

            {/* 🔐 STEP 2: LOGIN */}
            {unlocked && (
                <div className=" text-center text-sm text-pink-500" style={{ marginTop: '12px' }}>
                    <div style={{ display: 'grid', gap: '2px' }}>
                        <p>
                            Your name: <span className="font-semibold">JulieCute</span>
                        </p>
                        <p>
                            Your password: <span className="font-semibold">17012026</span>
                        </p>
                    </div>
                </div>
            )}

            {/* ❌ ERROR */}
            {error && <p className="text-sm text-red-500 text-center">{error}</p>}
        </DialogContent>
    );
}
