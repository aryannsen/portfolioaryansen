import React, { useState } from 'react';
import { X, CheckCircle2, ArrowRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [selectedDate, setSelectedDate] = useState<string>('Tomorrow, 10:00 AM');
  const [selectedSlot, setSelectedSlot] = useState<string>('10:00 AM - 10:30 AM');
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  if (!isOpen) return null;

  const dates = [
    { day: 'Mon', date: 'Aug 3', full: 'Monday, Aug 3' },
    { day: 'Tue', date: 'Aug 4', full: 'Tuesday, Aug 4' },
    { day: 'Wed', date: 'Aug 5', full: 'Wednesday, Aug 5' },
    { day: 'Thu', date: 'Aug 6', full: 'Thursday, Aug 6' },
    { day: 'Fri', date: 'Aug 7', full: 'Friday, Aug 7' },
  ];

  const slots = [
    '09:30 AM - 10:00 AM',
    '11:00 AM - 11:30 AM',
    '02:00 PM - 02:30 PM',
    '04:30 PM - 05:00 PM',
  ];

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && contact) {
      setConfirmed(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1D1E20]/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-[#FAFAF8] dark:bg-[#1C1D21] rounded-2xl border border-[#202124]/10 dark:border-white/10 shadow-2xl p-6 sm:p-8 overflow-hidden transition-colors duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#202124]/10 dark:border-white/10 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#1D1E20] dark:bg-[#FAFAF8] text-[#FAFAF8] dark:text-[#1D1E20] flex items-center justify-center font-bold text-xs">
              A
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#202124] dark:text-[#FAFAF8] font-display">
                Project & Learning Discussion
              </h3>
              <p className="text-[10px] text-[#6B6D70] dark:text-[#A0A2A5]">
                With {PERSONAL_INFO.name} · B.Tech IT Student (GTU)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-[#E9E8E4] dark:bg-[#2C2E33] text-[#202124] dark:text-[#FAFAF8] hover:bg-[#202124] hover:text-[#FAFAF8] dark:hover:bg-[#FAFAF8] dark:hover:text-[#202124] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {confirmed ? (
          <div className="py-8 text-center space-y-6 animate-in fade-in duration-300">
            <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-[#202124] dark:text-[#FAFAF8] font-display mb-1">
                Meeting Confirmed!
              </h4>
              <p className="text-xs text-[#6B6D70] dark:text-[#A0A2A5] max-w-xs mx-auto leading-relaxed">
                Discussion session confirmed for <span className="font-semibold text-[#202124] dark:text-[#FAFAF8]">{selectedDate} ({selectedSlot})</span>. I will reach out to <span className="font-semibold text-[#202124] dark:text-[#FAFAF8]">{contact}</span>.
              </p>
            </div>
            <button
              onClick={onClose}
              className="bg-[#202124] dark:bg-[#FAFAF8] text-[#FAFAF8] dark:text-[#202124] px-6 py-2 rounded-full text-xs font-semibold hover:bg-[#383A3E] dark:hover:bg-[#E9E8E4] transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleConfirm} className="space-y-6">
            
            {/* Step 1: Select Date */}
            <div>
              <label className="text-xs font-bold text-[#202124] dark:text-[#FAFAF8] uppercase tracking-wider block mb-2">
                1. SELECT DATE
              </label>
              <div className="grid grid-cols-5 gap-2">
                {dates.map((d) => (
                  <button
                    key={d.full}
                    type="button"
                    onClick={() => setSelectedDate(d.full)}
                    className={`p-2 rounded-xl text-center border transition-all cursor-pointer ${
                      selectedDate === d.full
                        ? 'bg-[#202124] dark:bg-[#FAFAF8] text-[#FAFAF8] dark:text-[#202124] border-[#202124] dark:border-[#FAFAF8]'
                        : 'bg-[#F4F3F0] dark:bg-[#121315] text-[#202124] dark:text-[#FAFAF8] border-[#202124]/10 dark:border-white/10 hover:border-[#202124]/30 dark:hover:border-white/30'
                    }`}
                  >
                    <div className="text-[10px] uppercase text-inherit opacity-80">{d.day}</div>
                    <div className="text-xs font-bold">{d.date}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Select Time Slot */}
            <div>
              <label className="text-xs font-bold text-[#202124] dark:text-[#FAFAF8] uppercase tracking-wider block mb-2">
                2. SELECT TIME SLOT
              </label>
              <div className="grid grid-cols-2 gap-2">
                {slots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedSlot(slot)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold border text-center transition-all cursor-pointer ${
                      selectedSlot === slot
                        ? 'bg-[#202124] dark:bg-[#FAFAF8] text-[#FAFAF8] dark:text-[#202124] border-[#202124] dark:border-[#FAFAF8]'
                        : 'bg-[#F4F3F0] dark:bg-[#121315] text-[#6B6D70] dark:text-[#A0A2A5] border-[#202124]/10 dark:border-white/10 hover:border-[#202124]/30 dark:hover:border-white/30'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Attendee Details */}
            <div className="space-y-3 pt-2">
              <div>
                <input
                  type="text"
                  placeholder="Your Name *"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F4F3F0] dark:bg-[#121315] border border-[#202124]/10 dark:border-white/10 text-xs text-[#202124] dark:text-[#FAFAF8] focus:outline-none focus:border-[#202124] dark:focus:border-[#FAFAF8]"
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Your Phone Number or Contact Handle *"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F4F3F0] dark:bg-[#121315] border border-[#202124]/10 dark:border-white/10 text-xs text-[#202124] dark:text-[#FAFAF8] focus:outline-none focus:border-[#202124] dark:focus:border-[#FAFAF8]"
                  required
                />
              </div>
            </div>

            {/* Confirm Button */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-[#202124] dark:bg-[#FAFAF8] text-[#FAFAF8] dark:text-[#202124] hover:bg-[#383A3E] dark:hover:bg-[#E9E8E4] py-3 rounded-xl text-xs font-bold transition-all cursor-pointer"
            >
              <span>Confirm Meeting Request</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </form>
        )}
      </div>
    </div>
  );
};
