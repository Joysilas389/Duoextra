'use client';
import { useState, useRef, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { aiTutorApi } from '@/services/api';
import { Send, Bot, Sparkles } from 'lucide-react';

const modes = [{id:'general',label:'General Tutor'},{id:'grammar',label:'Grammar Help'},{id:'writing_coach',label:'Writing Coach'},{id:'roleplay',label:'Roleplay Partner'},{id:'exam_strategy',label:'Exam Strategy'}];

export default function AiTutorPage() {
  const [mode, setMode] = useState(null);
  const [msgs, setMsgs] = useState([]);
  const [input, setInput] = useState('');
  const [convId, setConvId] = useState(null);
  const ref = useRef(null);
  const create = useMutation({ mutationFn: (m) => aiTutorApi.createConversation(m), onSuccess: (r) => { setConvId(r.data.id); setMsgs([{role:'assistant',content:'Hallo! How can I help you with German today?'}]); } });
  const send = useMutation({ mutationFn: ({c,m}) => aiTutorApi.sendMessage(c,m), onSuccess: (r) => setMsgs(p=>[...p,{role:'assistant',content:r.data.response}]) });
  useEffect(() => { ref.current?.scrollIntoView({behavior:'smooth'}); }, [msgs]);
  const doSend = () => { if(!input.trim()||!convId)return; setMsgs(p=>[...p,{role:'user',content:input}]); send.mutate({c:convId,m:input}); setInput(''); };

  if (!mode) return (
    <div className="max-w-3xl space-y-8">
      <div><h1 className="font-display font-bold text-2xl mb-1">AI Tutor</h1><p className="text-slate-500">Your personal German language assistant.</p></div>
      <div className="grid md:grid-cols-2 gap-4">{modes.map(m=>(
        <button key={m.id} onClick={()=>{setMode(m.id);create.mutate(m.id);}} className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-left card-hover">
          <Sparkles className="w-5 h-5 text-accent-600 mb-3" /><h3 className="font-display font-semibold">{m.label}</h3></button>))}</div></div>);

  return (
    <div className="max-w-3xl flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex items-center gap-3 pb-4 border-b border-slate-200 dark:border-slate-700">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent-500 to-brand-500 flex items-center justify-center"><Bot className="w-5 h-5 text-white" /></div>
        <div><h2 className="font-display font-semibold">AI Tutor</h2><p className="text-xs text-slate-400 capitalize">{mode?.replace(/_/g,' ')} mode</p></div></div>
      <div className="flex-1 overflow-y-auto py-6 space-y-4">{msgs.map((m,i)=>(
        <div key={i} className={`flex gap-3 ${m.role==='user'?'justify-end':''}`}>{m.role==='assistant'&&<div className="w-8 h-8 rounded-lg bg-accent-100 flex items-center justify-center flex-shrink-0"><Bot className="w-4 h-4 text-accent-600" /></div>}
          <div className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${m.role==='user'?'bg-brand-600 text-white rounded-br-md':'bg-slate-100 dark:bg-slate-800 rounded-bl-md'}`}>{m.content}</div></div>))}
        <div ref={ref} /></div>
      <div className="flex gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
        <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&doSend()} placeholder="Ask your question..." className="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 outline-none focus:ring-2 focus:ring-brand-500" />
        <button onClick={doSend} disabled={!input.trim()} className="px-4 py-3 rounded-xl bg-brand-600 text-white hover:bg-brand-700 disabled:opacity-50 transition"><Send className="w-5 h-5" /></button></div>
    </div>);
}
