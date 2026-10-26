
import { createClient } from '@supabase/supabase-js';

// Use environment variables with proper defaults
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Check if environment variables are properly set
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.');
}

// Create a mock client that implements method chaining properly and generates mock data
const createMockClient = () => {
  // Storage for mock data - use localStorage to persist data between refreshes
  const loadMockData = () => {
    try {
      const storedData = localStorage.getItem('blockvote_mock_data');
      if (storedData) {
        return JSON.parse(storedData);
      }
    } catch (error) {
      console.error('Error loading mock data from localStorage:', error);
    }
    
    // Default empty data structure
    return {
      parties: [],
      candidates: [],
      users: [],
      votes: []
    };
  };
  
  // Initialize with stored data or empty defaults
  const mockDb = loadMockData();
  
  // Save mock data to localStorage
  const saveMockData = () => {
    try {
      localStorage.setItem('blockvote_mock_data', JSON.stringify(mockDb));
    } catch (error) {
      console.error('Error saving mock data to localStorage:', error);
    }
  };
  
  // Helper to generate UUIDs for mock data
  const generateUuid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };
  
  // Base query builder that returns proper Promises
  const createQueryBuilder = (table: keyof typeof mockDb) => {
    let filters: any[] = [];
    let selectedFields: string[] | null = null;
    let limitCount: number | null = null;
    let orderField: string | null = null;
    let orderDirection: 'asc' | 'desc' = 'asc';
    let insertData: any[] = [];
    let updateData: any = {};
    let operation: 'select' | 'insert' | 'update' | 'delete' = 'select';
    
    const executeQuery = () => {
      try {
        // Different operations based on the operation type
        switch (operation) {
          case 'select': {
            let result = [...mockDb[table]];
            
            // Apply filters if any
            if (filters.length > 0) {
              filters.forEach(filter => {
                if (filter.type === 'eq') {
                  result = result.filter(item => item[filter.field] === filter.value);
                }
              });
            }
            
            // Apply ordering
            if (orderField) {
              result.sort((a, b) => {
                if (a[orderField] < b[orderField]) return orderDirection === 'asc' ? -1 : 1;
                if (a[orderField] > b[orderField]) return orderDirection === 'asc' ? 1 : -1;
                return 0;
              });
            }
            
            // Apply limit
            if (limitCount !== null) {
              result = result.slice(0, limitCount);
            }
            
            return { data: result, error: null };
          }
          case 'insert': {
            const newItems = insertData.map(item => {
              const timestamp = new Date().toISOString();
              return {
                ...item,
                id: generateUuid(),
                created_at: timestamp
              };
            });
            
            mockDb[table] = [...mockDb[table], ...newItems];
            saveMockData(); // Save to localStorage after insert
            return { data: newItems.length === 1 ? newItems[0] : newItems, error: null };
          }
          case 'update': {
            let updatedItem = null;
            mockDb[table] = mockDb[table].map(item => {
              if (filters.some(filter => 
                filter.type === 'eq' && 
                filter.field === 'id' && 
                filter.value === item.id
              )) {
                updatedItem = { ...item, ...updateData };
                return updatedItem;
              }
              return item;
            });
            saveMockData(); // Save to localStorage after update
            return { data: updatedItem, error: null };
          }
          case 'delete': {
            const initialLength = mockDb[table].length;
            mockDb[table] = mockDb[table].filter(item => 
              !filters.some(filter => 
                filter.type === 'eq' && 
                filter.field === 'id' && 
                filter.value === item.id
              )
            );
            saveMockData(); // Save to localStorage after delete
            return { data: { count: initialLength - mockDb[table].length }, error: null };
          }
        }
      } catch (error) {
        console.error(`Mock DB error:`, error);
        return { data: null, error: new Error('Mock DB operation failed') };
      }
    };
    
    // Create a builder that correctly implements the Promise interface
    const builder: any = {};
    
    // Add methods that return the builder for chaining
    builder.select = (fields?: string) => {
      selectedFields = fields?.split(',').map(f => f.trim()) || null;
      return builder;
    };
    
    builder.order = (field: string, options?: { ascending?: boolean }) => {
      orderField = field;
      orderDirection = options?.ascending === false ? 'desc' : 'asc';
      return builder;
    };
    
    builder.limit = (count: number) => {
      limitCount = count;
      return builder;
    };
    
    builder.single = () => {
      limitCount = 1;
      return {
        then: (onFulfilled?: any, onRejected?: any) => {
          const result = executeQuery();
          const singleResult = result.data ? 
            Array.isArray(result.data) ? result.data[0] || null : result.data 
            : null;
          const promise = Promise.resolve({ data: singleResult, error: result.error });
          return promise.then(onFulfilled, onRejected);
        }
      };
    };
    
    builder.eq = (field: string, value: any) => {
      filters.push({ type: 'eq', field, value });
      return builder;
    };
    
    builder.insert = (data: any | any[]) => {
      operation = 'insert';
      insertData = Array.isArray(data) ? data : [data];
      return builder;
    };
    
    builder.update = (data: any) => {
      operation = 'update';
      updateData = data;
      return builder;
    };
    
    builder.delete = () => {
      operation = 'delete';
      return builder;
    };
    
    // Make the builder properly awaitable
    builder.then = (onFulfilled?: any, onRejected?: any) => {
      const result = executeQuery();
      const promise = Promise.resolve(result);
      return promise.then(onFulfilled, onRejected);
    };
    
    return builder;
  };
  
  // Create the mock client with all necessary methods
  return {
    from: (table: string) => createQueryBuilder(table as keyof typeof mockDb),
    auth: {
      signIn: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
      signUp: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
      signOut: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
      getUser: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    },
    storage: {
      from: () => ({
        upload: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
        download: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
        list: () => Promise.resolve({ data: [], error: new Error('Supabase not configured') }),
        remove: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
        getPublicUrl: () => ({ data: { publicUrl: '' }, error: null }),
      }),
    },
  };
};

// Create the real client or use the mock client
const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createMockClient();

// Log initialization for debugging
console.log('Supabase client initialized with URL:', supabaseUrl ? supabaseUrl : 'MOCK DATABASE (localStorage)');
console.log('Data will', supabaseUrl ? 'persist in cloud database' : 'be stored in browser localStorage until cleared');

// Database types for better TypeScript support
export type Party = {
  id: string;
  name: string;
  symbol: string;
  created_at?: string;
}

export type Candidate = {
  id: string;
  name: string;
  party_id: string;
  image_url: string;
  created_at?: string;
}

export type Voter = {
  id: string;
  name: string;
  email: string;
  aadhaar_number: string;
  has_voted: boolean;
  created_at?: string;
}

export type Vote = {
  id: string;
  voter_id: string;
  candidate_id: string;
  timestamp: string;
  hash?: string;
  blockchain_tx_hash?: string;
}

export { supabase };
