#!/bin/bash

# Admin Panel Test Script
# Bu script admin panel'in tüm özelliklerini test eder

echo "🧪 Admin Panel Test Başlatılıyor..."
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test counter
TESTS_PASSED=0
TESTS_FAILED=0

# Function to test endpoint
test_endpoint() {
    local name=$1
    local url=$2
    local expected=$3
    
    echo -n "Testing $name... "
    
    response=$(curl -s -o /dev/null -w "%{http_code}" "$url")
    
    if [ "$response" = "$expected" ]; then
        echo -e "${GREEN}✓ PASS${NC} (HTTP $response)"
        ((TESTS_PASSED++))
    else
        echo -e "${RED}✗ FAIL${NC} (Expected $expected, got $response)"
        ((TESTS_FAILED++))
    fi
}

echo "📋 Testing Admin Panel Endpoints..."
echo "=================================="
echo ""

# Test 1: Login page accessible
test_endpoint "Login Page" "http://localhost:3000/admin/login" "200"

# Test 2: Dashboard redirects to login (without auth)
test_endpoint "Dashboard Protection" "http://localhost:3000/admin/dashboard" "307"

# Test 3: Auth API available
test_endpoint "Auth API" "http://localhost:3000/api/auth/providers" "200"

# Test 4: Homepage accessible
test_endpoint "Homepage" "http://localhost:3000/" "200"

echo ""
echo "=================================="
echo "📊 Test Results"
echo "=================================="
echo -e "Passed: ${GREEN}$TESTS_PASSED${NC}"
echo -e "Failed: ${RED}$TESTS_FAILED${NC}"
echo ""

if [ $TESTS_FAILED -eq 0 ]; then
    echo -e "${GREEN}✅ All tests passed!${NC}"
    echo ""
    echo "🔐 Ready to login:"
    echo "   URL: http://localhost:3000/admin/login"
    echo "   Username: admin"
    echo "   Password: AlexTroy2025!Secure"
    echo ""
    exit 0
else
    echo -e "${RED}❌ Some tests failed!${NC}"
    exit 1
fi
