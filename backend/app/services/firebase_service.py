import firebase_admin
from firebase_admin import credentials, firestore
import os
from typing import Optional

# Global Firestore client
_firestore_client: Optional[firestore.Client] = None

def initialize_firebase():
    """Initialize Firebase Admin SDK"""
    global _firestore_client
    
    if not firebase_admin._apps:
        # For development, you can use the Firebase emulator
        # or provide your service account key
        
        # Check if running in Firebase emulator
        if os.getenv("FIRESTORE_EMULATOR_HOST"):
            # Use emulator
            firebase_admin.initialize_app()
        else:
            # Use service account key (you'll need to add this)
            service_account_path = os.getenv("FIREBASE_SERVICE_ACCOUNT_PATH")
            if service_account_path and os.path.exists(service_account_path):
                cred = credentials.Certificate(service_account_path)
                firebase_admin.initialize_app(cred)
            else:
                # For demo purposes, we'll create a mock implementation
                # In production, you must provide proper Firebase credentials
                print("Warning: No Firebase credentials found. Using mock implementation.")
                return MockFirestoreClient()
    
    _firestore_client = firestore.client()
    return _firestore_client

def get_firestore_client():
    """Get Firestore client instance"""
    global _firestore_client
    
    if _firestore_client is None:
        _firestore_client = initialize_firebase()
    
    return _firestore_client

class MockFirestoreClient:
    """Mock Firestore client for development without Firebase setup"""
    
    def __init__(self):
        self._data = {}
    
    def collection(self, collection_name):
        return MockCollection(collection_name, self._data)

class MockCollection:
    def __init__(self, name, data_store):
        self.name = name
        self.data = data_store.setdefault(name, {})
    
    def document(self, doc_id):
        return MockDocument(doc_id, self.data)
    
    def where(self, field, operator, value):
        return MockQuery(self.data, [(field, operator, value)])
    
    def get(self):
        return [MockDocumentSnapshot(doc_id, doc_data) for doc_id, doc_data in self.data.items()]

class MockQuery:
    def __init__(self, data, filters):
        self.data = data
        self.filters = filters
    
    def where(self, field, operator, value):
        new_filters = self.filters + [(field, operator, value)]
        return MockQuery(self.data, new_filters)
    
    def order_by(self, field, direction="ASCENDING"):
        return self
    
    def limit(self, count):
        return self
    
    def get(self):
        # Simple mock filtering
        results = []
        for doc_id, doc_data in self.data.items():
            match = True
            for field, operator, value in self.filters:
                if field in doc_data:
                    if operator == "==" and doc_data[field] != value:
                        match = False
                        break
                    elif operator == ">=" and doc_data[field] < value:
                        match = False
                        break
                else:
                    match = False
                    break
            
            if match:
                results.append(MockDocumentSnapshot(doc_id, doc_data))
        
        return results

class MockDocument:
    def __init__(self, doc_id, collection_data):
        self.id = doc_id
        self.collection_data = collection_data
    
    def set(self, data):
        self.collection_data[self.id] = data
    
    def update(self, data):
        if self.id in self.collection_data:
            self.collection_data[self.id].update(data)
    
    def delete(self):
        if self.id in self.collection_data:
            del self.collection_data[self.id]
    
    def get(self):
        return MockDocumentSnapshot(self.id, self.collection_data.get(self.id))

class MockDocumentSnapshot:
    def __init__(self, doc_id, data):
        self.id = doc_id
        self._data = data
        self.exists = data is not None
    
    def to_dict(self):
        return self._data or {}
