import { Tabs, TabsContent, TabsContents, TabsList, TabsTrigger } from '@/components/animate-ui/components/radix/tabs'
import { Button } from '@/components/animate-ui/components/buttons/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PandaDialog } from '@/components/PandaDialog/PandaDialog'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import * as React from 'react'
import Image from 'next/image';

export function LoginForm({ onSuccess }: { onSuccess: () => void }) {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleLogin = async () => {
        try {
            setError('')
            setLoading(true)

            const res = await fetch('https://valentine-be.onrender.com/v1/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, password })
            })

            const data = await res.json()

            if (!res.ok) {
                setError(data.message || 'Login failed')
                return
            }

            localStorage.setItem('user', JSON.stringify(data));

            onSuccess()
        } catch (err) {
            setError('Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key="login"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6 }}
            >
                <Tabs defaultValue="introduce" style={{minWidth: '400px'}}>
                    <TabsList
                        style={{
                            gap: '5px',
                            padding: '0 2px',
                            boxShadow: '0px 0px 5px 5px rgba(0,0,0,0.05)'
                        }}
                    >
                        <TabsTrigger value="introduce">
                            <div style={{ cursor: 'pointer', color: '#E75480' }}>
                                Introduce
                            </div>
                        </TabsTrigger>
                        <TabsTrigger value="login">
                            <div style={{  cursor: 'pointer', color: '#E75480' }}>
                                Login
                            </div>
                        </TabsTrigger>
                    </TabsList>

                    <Card
                        className="shadow-none relative overflow-hidden"
                        style={{ boxShadow: '0px 0px 5px 5px rgba(0,0,0,0.05)'}}
                    >
                        <TabsContents style={{ padding: '24px 0', position: 'relative', zIndex: '10' }}>
                            {/* INTRODUCE TAB */}
                            <TabsContent value="introduce" className="flex flex-col" style={{ gap: '24px' }}>
                                <Image priority  className='absolute' src={'/introduce.png'}
                                       style={ {top: '-40px'} }
                                       height={800} width={500} alt={'gioi thieu'}/>

                                <CardHeader>
                                    <CardTitle style={{ padding: '5px 30px 0 30px', color: '#E75480' }}>Hi Julie</CardTitle>
                                    <CardDescription style={{padding: '0 30px', color: '#D63A6A' }}>
                                        Thank you for coming into my life and making it more beautiful.
                                    </CardDescription>
                                    <CardContent
                                    style={{color: '#E75480', padding: '0 30px'}}
                                    >You are the little piece of magic that turns ordinary days into something special.Thank you for being my smile and my happiness in the simplest moments.</CardContent>
                                    <CardFooter></CardFooter>
                                </CardHeader>
                            </TabsContent>

                            {/* LOGIN TAB */}
                            <TabsContent value="login" className="flex flex-col">
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault()
                                        handleLogin()
                                    }}
                                >
                                    <CardHeader style={{ marginTop: '5px' }}>
                                        <CardTitle style={{ color: '#E75480' }}>Login</CardTitle>
                                        <CardDescription style={{ color: '#D63A6A' }}>
                                            Log in to see what’s inside my heart.
                                        </CardDescription>
                                    </CardHeader>

                                    <CardContent
                                        style={{
                                            marginTop: '12px',
                                            display: 'grid',
                                            gap: '12px',
                                            color: '#E75480'
                                        }}
                                    >
                                        <div style={{ display: 'grid', gap: '4px' }}>
                                            <Label>Name</Label>
                                            <Input
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                        </div>

                                        <div style={{ display: 'grid', gap: '4px' }}>
                                            <Label>Password</Label>
                                            <Input
                                                type="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </div>

                                        <div className="flex items-center gap-2 cursor-pointer justify-center">
                                            <p className="text-sm text-muted-foreground">
                                                If you don&apos;t know, click this Panda
                                            </p>
                                            <PandaDialog />
                                        </div>
                                    </CardContent>

                                    <CardFooter
                                        style={{
                                            marginTop: '12px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '8px'
                                        }}
                                    >
                                        {error && (
                                            <p className="text-sm  text-center" style={{color: 'red'}}>{error}</p>
                                        )}

                                        <Button
                                            type="submit"
                                            disabled={loading}
                                            style={{
                                                backgroundColor: 'lightpink',
                                                cursor: loading ? 'not-allowed' : 'pointer',
                                                width: '100%'
                                            }}
                                        >
                                            {loading ? 'Logging in...' : 'Login'}
                                        </Button>
                                    </CardFooter>
                                </form>
                            </TabsContent>
                        </TabsContents>




                    </Card>
                </Tabs>
            </motion.div>
        </AnimatePresence>
    )
}
