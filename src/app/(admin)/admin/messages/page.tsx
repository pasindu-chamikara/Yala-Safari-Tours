"use client";

import { useState, useEffect } from "react";
import { ContactMessage } from "@/types";
import { getMessages, updateMessageStatus, deleteMessage } from "@/lib/firebase/messages";
import { Mail, MailOpen, Reply, Trash2, Search, Filter } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | ContactMessage["status"]>("ALL");
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setIsLoading(true);
    try {
      const data = await getMessages();
      setMessages(data);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
      toast.error("Failed to load messages.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (id: string, status: ContactMessage["status"]) => {
    try {
      await updateMessageStatus(id, status);
      setMessages(messages.map(m => m.id === id ? { ...m, status } : m));
      if (selectedMessage?.id === id) {
        setSelectedMessage({ ...selectedMessage, status });
      }
      toast.success(`Message marked as ${status.toLowerCase()}`);
    } catch (error) {
      console.error("Failed to update status:", error);
      toast.error("Failed to update status.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message? This cannot be undone.")) return;
    
    try {
      await deleteMessage(id);
      setMessages(messages.filter(m => m.id !== id));
      if (selectedMessage?.id === id) {
        setSelectedMessage(null);
      }
      toast.success("Message deleted successfully.");
    } catch (error) {
      console.error("Failed to delete message:", error);
      toast.error("Failed to delete message.");
    }
  };

  const filteredMessages = messages.filter(m => {
    const matchesSearch = 
      m.firstName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      m.lastName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.subject.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "ALL" || m.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-stone-800">Messages & Enquiries</h1>
          <p className="text-stone-500 mt-1">Manage contact form submissions</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4 bg-white p-4 shadow-sm border border-stone-200">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-stone-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-stone-300 rounded-none focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
            placeholder="Search by name, email, or subject..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-stone-400" />
          <select
            className="block w-40 pl-3 pr-10 py-2 border border-stone-300 rounded-none focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
          >
            <option value="ALL">All Status</option>
            <option value="UNREAD">Unread</option>
            <option value="READ">Read</option>
            <option value="REPLIED">Replied</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Messages List */}
        <div className="flex-1 lg:w-1/2 bg-white shadow-sm border border-stone-200 overflow-hidden">
          {isLoading ? (
            <div className="p-8 text-center text-stone-500">Loading messages...</div>
          ) : filteredMessages.length === 0 ? (
            <div className="p-8 text-center text-stone-500">No messages found.</div>
          ) : (
            <div className="divide-y divide-stone-200 max-h-[600px] overflow-y-auto custom-scrollbar">
              {filteredMessages.map((message) => (
                <div 
                  key={message.id}
                  onClick={() => setSelectedMessage(message)}
                  className={`p-4 cursor-pointer transition-colors hover:bg-stone-50 ${selectedMessage?.id === message.id ? 'bg-emerald-50 border-l-4 border-emerald-500' : 'border-l-4 border-transparent'} ${message.status === 'UNREAD' ? 'bg-stone-50/50' : ''}`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <h3 className={`text-sm font-medium ${message.status === 'UNREAD' ? 'text-stone-900 font-bold' : 'text-stone-700'}`}>
                      {message.firstName} {message.lastName}
                    </h3>
                    <span className="text-xs text-stone-500">
                      {new Date(message.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="text-sm font-medium text-stone-800 mb-1 line-clamp-1">{message.subject}</div>
                  <div className="text-sm text-stone-500 line-clamp-2">{message.message}</div>
                  
                  <div className="mt-3 flex items-center justify-between">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${message.status === 'UNREAD' ? 'bg-blue-100 text-blue-800' : ''}
                      ${message.status === 'READ' ? 'bg-stone-100 text-stone-800' : ''}
                      ${message.status === 'REPLIED' ? 'bg-emerald-100 text-emerald-800' : ''}
                    `}>
                      {message.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Message Details */}
        <div className="flex-1 lg:w-1/2">
          {selectedMessage ? (
            <div className="bg-white shadow-sm border border-stone-200 p-6 sticky top-6">
              <div className="flex justify-between items-start mb-6 pb-4 border-b border-stone-200">
                <div>
                  <h2 className="text-xl font-bold text-stone-900">{selectedMessage.subject}</h2>
                  <div className="flex items-center gap-2 mt-2 text-sm text-stone-600">
                    <span className="font-medium">{selectedMessage.firstName} {selectedMessage.lastName}</span>
                    <span>&lt;{selectedMessage.email}&gt;</span>
                  </div>
                  <div className="text-xs text-stone-500 mt-1">
                    {new Date(selectedMessage.createdAt).toLocaleString()}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => handleDelete(selectedMessage.id!)}
                    className="p-2 text-red-500 hover:bg-red-50 transition-colors"
                    title="Delete Message"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="prose max-w-none mb-8 text-stone-700 whitespace-pre-wrap">
                {selectedMessage.message}
              </div>

              <div className="border-t border-stone-200 pt-6">
                <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider mb-4">Actions</h3>
                <div className="flex flex-wrap gap-3">
                  <a 
                    href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                    className="flex items-center gap-2 px-4 py-2 bg-stone-900 text-white text-sm font-medium hover:bg-stone-800 transition-colors"
                    onClick={() => {
                      if (selectedMessage.status === 'UNREAD') {
                        handleStatusChange(selectedMessage.id!, 'READ');
                      }
                    }}
                  >
                    <Reply className="w-4 h-4" /> Reply via Email
                  </a>
                  
                  {selectedMessage.status !== 'UNREAD' && (
                    <button 
                      onClick={() => handleStatusChange(selectedMessage.id!, 'UNREAD')}
                      className="flex items-center gap-2 px-4 py-2 bg-white border border-stone-300 text-stone-700 text-sm font-medium hover:bg-stone-50 transition-colors"
                    >
                      <Mail className="w-4 h-4" /> Mark as Unread
                    </button>
                  )}

                  {selectedMessage.status !== 'READ' && selectedMessage.status !== 'REPLIED' && (
                    <button 
                      onClick={() => handleStatusChange(selectedMessage.id!, 'READ')}
                      className="flex items-center gap-2 px-4 py-2 bg-white border border-stone-300 text-stone-700 text-sm font-medium hover:bg-stone-50 transition-colors"
                    >
                      <MailOpen className="w-4 h-4" /> Mark as Read
                    </button>
                  )}

                  {selectedMessage.status !== 'REPLIED' && (
                    <button 
                      onClick={() => handleStatusChange(selectedMessage.id!, 'REPLIED')}
                      className="flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-medium hover:bg-emerald-100 transition-colors"
                    >
                      <Reply className="w-4 h-4" /> Mark as Replied
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-stone-50 border border-stone-200 p-12 text-center text-stone-500 h-full flex flex-col items-center justify-center min-h-[400px]">
              <Mail className="w-12 h-12 text-stone-300 mb-4" />
              <p>Select a message to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
